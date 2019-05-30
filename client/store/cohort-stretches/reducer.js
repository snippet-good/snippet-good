import { GET_COHORT_STRETCHES, UPDATE_COHORT_STRETCH } from './actions'

export default (state = [], action) => {
  switch (action.type) {
    case GET_COHORT_STRETCHES:
      return [...action.cohortStretches]
    case UPDATE_COHORT_STRETCH:
      return state.map(item =>
        item.id === action.cohortStretchId ? action.updatedItemFrontEnd : item
      )
    default:
      return state
  }
}
