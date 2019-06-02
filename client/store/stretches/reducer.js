import { GET_STRETCHES, UPDATE_STRETCH } from './actions'

export default (state = [], action) => {
  switch (action.type) {
    case GET_STRETCHES:
      return [...action.stretches]

    case UPDATE_STRETCH:
      return [
        ...state.filter(s => s.id !== action.updatedStretch.id),
        action.updatedStretch
      ]

    default:
      return state
  }
}
