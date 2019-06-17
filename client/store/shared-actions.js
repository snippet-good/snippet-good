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
  updateCohortStretchThunk
} from './cohort-stretches/actions'
import { addFlashMessage } from './flash-message/actions'
import { sendClosedStretch } from './socket/actions'
import store from './store'
import moment from 'moment'
import { generateFlashMessageId } from '../utilityfunctions'

export const closeStretchProcess = cohortStretch => {
  return dispatch => {
    return dispatch(
      updateCohortStretchThunk(cohortStretch.id, { status: 'closed' })
    ).then(() => {
      const { stretches, flashMessages } = store.getState()
      const { title } = stretches.find(s => s.id === cohortStretch.stretchId)
      const { id, cohortName } = cohortStretch
      const flashMessageId = generateFlashMessageId(
        flashMessages,
        'stretchClosed'
      )
      dispatch(
        addFlashMessage({
          id: flashMessageId,
          body: `Stretch ${title} has been closed in ${cohortName}`,
          linkLabel: 'Click here to review it',
          link: `/admin/stretchReview/${id}`
        })
      )
      dispatch(sendClosedStretch({ ...cohortStretch, status: 'closed' }))
    })
  }
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
      openCohortStretches.forEach(cohortStretch => {
        const stretch = stretches.find(s => s.id === cohortStretch.stretchId)
        const totalSecondsLeft =
          stretch.minutes * 60 -
          moment
            .utc(new Date())
            .local()
            .diff(moment.utc(cohortStretch.startTimer).local(), 'seconds')

        setTimeout(() => {
          dispatch(closeStretchProcess(cohortStretch))
        }, 1000 * totalSecondsLeft)
      })
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
    ])
  }
}
