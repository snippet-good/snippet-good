import { GET_COHORT_USERS } from './actions'

export default (state = [], action) => {
  switch (action.type) {
    case GET_COHORT_USERS:
      return [...action.cohortUsers]

    default:
      return state
  }
}
