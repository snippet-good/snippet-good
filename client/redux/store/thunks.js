import store from './store'
import axios from 'axios'
import * as actions from './actions'

export const login = (userName, password) => {
  return dispatch => {
    return axios
      .post('/api/auth', { userName, password })
      .then(res => res.data)
      .then(user => dispatch(actions.getUser(user)))
  }
}
