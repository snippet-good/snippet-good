import {
  GET_COHORT_STRETCHES,
  CREATE_COHORT_STRETCH,
  UPDATE_COHORT_STRETCH,
  DELETE_COHORT_STRETCH,
  START_STRETCH_TIMER
} from './actions'

export default (state = [], action) => {
  switch (action.type) {
    case GET_COHORT_STRETCHES:
      return [...action.cohortStretches]

    case CREATE_COHORT_STRETCH:
      return [...state, action.newCohortStretch]

    case UPDATE_COHORT_STRETCH:
      return [
        action.updatedCohortStretch,
        ...state.filter(cs => cs.id !== action.cohortStretchId)
      ]
    case DELETE_COHORT_STRETCH:
      return state.filter(cs => cs.id !== action.cohortStretchId)
    case START_STRETCH_TIMER:
      return [
        action.cohortStretch,
        ...state.filter(cs => cs.id !== action.cohortStretch.id)
      ]
    default:
      return state
  }
}
