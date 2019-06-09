import axios from 'axios'

// --------------------------------------------------
// Action types

export const GET_COHORT_STRETCHES = 'GET_COHORT_STRETCHES'
export const CREATE_COHORT_STRETCH = 'CREATE_COHORT_STRETCH'
export const UPDATE_COHORT_STRETCH = 'UPDATE_COHORT_STRETCH'
export const DELETE_COHORT_STRETCH = 'DELETE_COHORT_STRETCH'

// --------------------------------------------------
// Action creators

const getCohortStretches = cohortStretches => ({
  type: GET_COHORT_STRETCHES,
  cohortStretches
})

const addCohortStretch = newCohortStretch => ({
  type: CREATE_COHORT_STRETCH,
  newCohortStretch
})

const updateCohortStretch = (cohortStretchId, updatedCohortStretch) => ({
  type: UPDATE_COHORT_STRETCH,
  cohortStretchId,
  updatedCohortStretch
})

// --------------------------------------------------
// CRUD thunks

// Redux thunk to get all cohort stretches from API
export const getAllCohortStretches = () => dispatch => {
  return axios
    .get('/api/cohort-stretches')
    .then(res => dispatch(getCohortStretches(res.data)))
}

export const createCohortStretch = data => {
  return dispatch => {
    return axios
      .post('/api/cohort-stretches', data)
      .then(res => dispatch(addCohortStretch(res.data)))
  }
}

export const updateCohortStretchThunk = (cohortStretchId, updatedFields) => {
  return dispatch => {
    return axios
      .put(`/api/cohort-stretches/${cohortStretchId}`, updatedFields)
      .then(({data}) =>
        dispatch(updateCohortStretch(cohortStretchId, data))
      )
  }
}
