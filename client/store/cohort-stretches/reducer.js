import { GET_COHORT_STRETCHES } from './actions'

export default (state = [], action) => {
  switch (action.type) {
    case GET_COHORT_STRETCHES:
      return [...action.cohortStretches]

    default:
      return state
  }
}
