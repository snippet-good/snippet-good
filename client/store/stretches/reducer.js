import { GET_STRETCHES, CREATE_STRETCH, UPDATE_STRETCH } from './actions'

export default (state = [], action) => {
  switch (action.type) {
    case GET_STRETCHES:
      return [...action.stretches]

    case CREATE_STRETCH:
      return [...state, action.newStretch]

    case UPDATE_STRETCH:
      return [
        ...state.filter(s => s.id !== action.updatedStretch.id),
        action.updatedStretch
      ]

    default:
      return state
  }
}
