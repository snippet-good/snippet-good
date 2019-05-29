import { GET_USER_DETAILS } from './actions'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_USER_DETAILS:
      return { ...action.userDetails }

    default:
      return state
  }
}
