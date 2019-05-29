import axios from 'axios'

// --------------------------------------------------
// Action types

export const GET_COHORT_USERS = 'GET_COHORT_USERS'
export const CREATE_COHORT_USER = 'CREATE_COHORT_USER'
export const UPDATE_COHORT_USER = 'UPDATE_COHORT_USER'
export const DELETE_COHORT_USER = 'DELETE_COHORT_USER'

// --------------------------------------------------
// Action creators

const getCohortUsers = cohortUsers => ({
  type: GET_COHORT_USERS,
  cohortUsers
})

// --------------------------------------------------
// CRUD thunks

// Redux thunk to get all cohort stretches from API
export const getAllCohortUsers = () => dispatch => {
  return axios
    .get('/api/cohort-users')
    .then(res => dispatch(getCohortUsers(res.data)))
}
