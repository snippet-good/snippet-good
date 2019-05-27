import { GET_COHORTS } from './actions'

export default (state = [], action) => {
  switch (action.type) {
    case GET_COHORTS:
      state = action.cohorts
      return state
    default:
      return state
  }
}
