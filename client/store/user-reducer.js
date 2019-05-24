import { GET_USER } from './actions'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_USER:
      state = action.user
      return state
    default:
      return state
  }
}
