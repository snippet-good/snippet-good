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

const createCohortStretch = newCohortStretch => ({
  type: CREATE_COHORT_STRETCH,
  newCohortStretch
})

// --------------------------------------------------
// CRUD thunks

// Redux thunk to get all cohort stretches from API
export const getAllCohortStretches = () => dispatch => {
  return axios
    .get('/api/cohort-stretches')
    .then(res => dispatch(getCohortStretches(res.data)))
}
