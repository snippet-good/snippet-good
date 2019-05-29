import { GET_COHORTS } from './actions'

export default (state = [], action) => {
  switch (action.type) {
    case GET_COHORTS:
      return [...action.cohorts]

    default:
      return state
  }
}
