import axios from 'axios'
import { getCohortsOfAdminThunk } from './cohorts/actions'
import {
  getAllStretchAnswersThunk,
  getAnswersOfCohortsOfStudentThunk
} from './stretch-answers/actions'
import { getUsersOfSingleAdminThunk } from './users/actions'
import { getStudentCohortUsersThunk } from './cohort-users/actions'
import { getAllCategories } from './categories/actions'
import { getAllStretches } from './stretches/actions'
import {
  getAllCohortStretches,
  updateCohortStretchThunk,
  updateCohortStretch,
  startStretchTimer
} from './cohort-stretches/actions'
import { addFlashMessage } from './flash-message/actions'
import store from './store'
import moment from 'moment'
import { generateFlashMessageId } from '../utilityfunctions'

export const closeStretchProcess = cohortStretchId => {
  return dispatch => {
    return dispatch(
      updateCohortStretchThunk(cohortStretchId, { status: 'closed' })
    ).then(({ updatedCohortStretch }) => {
      const { stretches, flashMessages, userDetails } = store.getState()
      const { title } = stretches.find(
        s => s.id === updatedCohortStretch.stretchId
      )
      const { id, cohortName } = updatedCohortStretch
      const flashMessageId = generateFlashMessageId(
        flashMessages,
        'stretchClosed'
      )
      if (userDetails.id) {
        dispatch(
          addFlashMessage({
            id: flashMessageId,
            body: `Stretch ${title} has been closed in ${cohortName}`,
            linkLabel: 'Click here to review it',
            link: `/admin/stretchReview/${id}`
          })
        )
      }
    })
  }
}

export const openStretchProcessThunk = (
  stretch,
  cohortStretchId,
  updatedFields
) => {
  return dispatch => {
    return axios
      .put(`/api/cohort-stretches/${cohortStretchId}`, updatedFields)
      .then(({ data }) => {
        dispatch(updateCohortStretch(cohortStretchId, data))
        dispatch(startStretchTimer(data))
        /* setTimeout(() => {
          dispatch(closeStretchProcess(data))
        }, stretch.minutes * 1000 * 60)*/
      })
  }
}

const closeStretchOrOtherAction = (cohortStretch, stretch, dispatch, type) => {
  const totalSecondsLeft =
    stretch.minutes * 60 -
    moment
      .utc(new Date())
      .local()
      .diff(moment.utc(cohortStretch.startTimer).local(), 'seconds')
  if (totalSecondsLeft <= 1) {
    return dispatch(
      updateCohortStretchThunk(cohortStretch.id, {
        status: 'closed'
      })
    )
  }
  /*if (type === 'admin') {
    return setTimeout(() => {
      dispatch(closeStretchProcess(cohortStretch))
    }, 1000 * totalSecondsLeft)
  } else {
    return true
  }*/
}

export const loadAdminRelatedDataThunk = adminId => {
  return dispatch => {
    return Promise.all([
      dispatch(getAllCategories()),
      dispatch(getAllStretches()),
      dispatch(getAllCohortStretches()),
      dispatch(getCohortsOfAdminThunk(adminId)),
      dispatch(getAllStretchAnswersThunk()),
      dispatch(getUsersOfSingleAdminThunk(adminId))
    ]).then(data => {
      let [
        categories,
        { stretches },
        { cohortStretches },
        { cohorts },
        ...other
      ] = data

      const cohortIds = cohorts.map(c => c.id)
      const openCohortStretches = cohortStretches.filter(
        cs => cs.status === 'open' && cohortIds.includes(cs.cohortId)
      )

      return Promise.all(
        openCohortStretches.map(cohortStretch => {
          const stretch = stretches.find(s => s.id === cohortStretch.stretchId)
          return closeStretchOrOtherAction(
            cohortStretch,
            stretch,
            dispatch,
            'admin'
          )
        })
      )
    })
  }
}

export const loadStudentRelatedDataThunk = studentId => {
  return dispatch => {
    return Promise.all([
      dispatch(getAllCategories()),
      dispatch(getAllStretches()),
      dispatch(getAllCohortStretches()),
      dispatch(getAnswersOfCohortsOfStudentThunk(studentId)),
      dispatch(getStudentCohortUsersThunk(studentId))
    ]).then(data => {
      let [
        categories,
        { stretches },
        { cohortStretches },
        stretchAnswers,
        { cohortUsers }
      ] = data

      const cohortIds = cohortUsers.map(c => c.cohortId)
      const openCohortStretches = cohortStretches.filter(
        cs => cs.status === 'open' && cohortIds.includes(cs.cohortId)
      )
      return Promise.all(
        openCohortStretches.map(cohortStretch => {
          const stretch = stretches.find(s => s.id === cohortStretch.stretchId)
          return closeStretchOrOtherAction(
            cohortStretch,
            stretch,
            dispatch,
            'student'
          )
        })
      )
    })
  }
}
