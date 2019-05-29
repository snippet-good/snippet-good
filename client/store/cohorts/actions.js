import axios from 'axios'

// --------------------------------------------------
// Action types

export const GET_COHORTS = 'GET_COHORTS'
export const CREATE_COHORT = 'CREATE_COHORT'

// --------------------------------------------------
// Action creators

const getCohorts = cohorts => ({ type: GET_COHORTS, cohorts })
const createCohort = newCohort => ({ type: CREATE_COHORT, newCohort })

// --------------------------------------------------
// CRUD thunks

// Redux thunk to get all cohorts from API
export const getAllCohorts = () => dispatch => {
  return axios.get('/api/cohorts').then(res => dispatch(getCohorts(res.data)))
}
