import { GET_COMMENTS } from './actions'

export default (state = [], action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return action.comments
    default:
      return state
  }
}
