import axios from 'axios'
import * as actions from './actions'

export const login = (email, password) => {
  return dispatch => {
    return axios
      .post('/api/auth', { email, password })
      .then(res => res.data)
      .then(user => dispatch(actions.getUser(user)))
      .then(() => dispatch({ type: 'SEND_USER' }))
  }
}

export const checkIfUserLoggedInThunk = () => {
  return dispatch => {
    return axios
      .get('/api/auth')
      .then(({ data }) => dispatch(actions.getUser(data)))
  }
}

export const logoutUserThunk = () => {
  return dispatch => {
    return axios.delete('/api/auth').then(() => dispatch(actions.getUser({})))
  }
}
