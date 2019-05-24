import axios from 'axios'
import * as actions from './actions'

export const login = (email, password) => {
  return dispatch => {
    return axios
      .post('/api/auth', { email, password })
      .then(res => res.data)
      .then(user => dispatch(actions.getUser(user)))
  }
}
