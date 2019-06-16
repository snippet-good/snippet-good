import axios from 'axios'

import { getUser } from '../auth/actions'

// --------------------------------------------------
// Action types

export const GET_USERS = 'GET_USERS'
export const CREATE_USER = 'CREATE_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const DELETE_USER = 'DELETE_USER'

// --------------------------------------------------
// Action creators

const getUsers = users => ({ type: GET_USERS, users })
const addUser = newUser => ({ type: CREATE_USER, newUser })
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

export const createUser = userInformation => {
  return dispatch => {
    return axios
      .post('/api/users', userInformation)
      .then(res => res.data)
      .then(user => {
        dispatch(addUser(user))
        dispatch(getUser(user))
        return user
      })
  }
}

export const updateUser = userInfo => {}

export const deleteUser = userId => {}
