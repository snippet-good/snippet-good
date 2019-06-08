import axios from 'axios'

// --------------------------------------------------
// Action types

export const GET_USER_DETAILS = 'GET_USER_DETAILS'
export const LOGOUT = 'LOGOUT'

// --------------------------------------------------
// Action creators

export const getUser = userDetails => ({ type: GET_USER_DETAILS, userDetails })
const logutUser = () => ({ type: LOGOUT })

// --------------------------------------------------
// Authentication thunks

export const login = credentials => {
  return dispatch => {
    return axios
      .post('/api/auth', credentials)
      .then(res => res.data)
      .then(user => {
        dispatch(getUser(user))
        return user
      })
  }
}

export const checkIfUserLoggedInThunk = () => {
  return dispatch => {
    return axios
      .get('/api/auth')
      .then(res => res.data)
      .then(user => dispatch(getUser(user)))
  }
}

export const logoutUserThunk = () => {
  return dispatch => {
    return axios.delete('/api/auth').then(() => dispatch(logutUser()))
  }
}
