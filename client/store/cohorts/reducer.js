import { SET_COHORTS } from './actions'

export default (state = [], action) => {
  switch (action.type) {
    case SET_COHORTS:
      return [...action.cohorts]

    default:
      return state
  }
}
