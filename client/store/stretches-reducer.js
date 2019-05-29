import { GET_STRETCHES } from './actions'

export default (state = [], action) => {
  switch (action.type) {
    case GET_STRETCHES:
      state = action.stretches
      return state
    default:
      return state
  }
}
