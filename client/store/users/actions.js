import axios from 'axios'

// --------------------------------------------------
// Action types

export const GET_USERS = 'GET_USERS'
export const CREATE_USER = 'CREATE_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const DELETE_USER = 'DELETE_USER'

// --------------------------------------------------
// Action creators

const getUsers = users => ({ type: GET_USERS, users })
const createUser = newUser => ({ type: CREATE_USER, newUser })
const replaceUser = updatedUser => ({ type: UPDATE_USER, updatedUser })
const removeUser = userId => ({ type: DELETE_USER, userId })

// --------------------------------------------------
// CRUD thunks

// Redux thunk to get all users from API
export const getAllUsers = () => dispatch => {
  return axios.get('/api/users').then(res => dispatch(getUsers(res.data)))
}

export const getUsersOfSingleAdminThunk = adminId => {
  return dispatch => {
    return axios
      .get(`/api/users/admin/${adminId}`)
      .then(res => dispatch(getUsers(res.data)))
  }
}

export const createNewUser = newUser => {}

export const updateUser = userInfo => {}

export const deleteUser = userId => {}
