// --------------------------------------------------
// Action types

export const GET_USER_DETAILS = 'GET_USER_DETAILS'

// --------------------------------------------------
// Action creators

const getUser = userDetails => ({ type: GET_USER_DETAILS, userDetails })

// --------------------------------------------------
// Authentication thunks

export const login = (email, password) => {
  return dispatch => {
    return axios
      .post('/api/auth', { email, password })
      .then(res => res.data)
      .then(user => dispatch(getUser(user)))
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
    return axios.delete('/api/auth').then(() => dispatch(getUser({})))
  }
}
