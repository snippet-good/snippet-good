import { GET_STRETCHES } from './actions'

export default (state = [], action) => {
  switch (action.type) {
    case GET_STRETCHES:
      return [...action.stretches]

    default:
      return state
  }
}
