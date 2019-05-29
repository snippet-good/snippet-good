import { GET_COHORT } from './actions'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_COHORT:
      state = action.cohort
      return state
    default:
      return state
  }
}
