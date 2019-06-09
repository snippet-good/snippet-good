import {
  GET_COHORT_STRETCHES,
  CREATE_COHORT_STRETCH,
  UPDATE_COHORT_STRETCH
} from './actions'

export default (state = [], action) => {
  switch (action.type) {
    case GET_COHORT_STRETCHES:
      return [...action.cohortStretches]

    case CREATE_COHORT_STRETCH:
      return [...state, action.newCohortStretch]

    case UPDATE_COHORT_STRETCH:
      return state.map(item =>
        item.id === action.cohortStretchId ? action.updatedCohortStretch : item
      )
    default:
      return state
  }
}
