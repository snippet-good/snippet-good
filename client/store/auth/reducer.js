import { GET_USER_DETAILS, LOGOUT } from './actions'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_USER_DETAILS:
      return { ...action.userDetails }
    case LOGOUT:
      return {}
    default:
      return state
  }
}
