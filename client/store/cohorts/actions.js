import axios from 'axios'

// --------------------------------------------------
// Action types

export const SET_COHORTS = 'SET_COHORTS'
export const CREATE_COHORT = 'CREATE_COHORT'

// --------------------------------------------------
// Action creators

const setCohorts = cohorts => ({ type: SET_COHORTS, cohorts })
const createCohort = newCohort => ({ type: CREATE_COHORT, newCohort })

// --------------------------------------------------
// CRUD thunks

// Redux thunk to get all cohorts from API
export const getAllCohorts = () => dispatch => {
  return axios.get('/api/cohorts').then(res => dispatch(setCohorts(res.data)))
}

export const getCohortsOfAdminThunk = adminId => {
  return dispatch => {
    return axios
      .get(`/api/cohorts/user/${adminId}`)
      .then(({ data }) => dispatch(setCohorts(data)))
  }
}
