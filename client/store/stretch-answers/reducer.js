import {
  GET_STRETCH_ANSWERS,
  CREATE_STRETCH_ANSWER,
  UPDATE_STRETCH_ANSWER,
  ADD_RECEIVED_STRETCH_ANSWER
} from './actions'

export default (state = [], action) => {
  switch (action.type) {
    case GET_STRETCH_ANSWERS:
      return [...action.stretchAnswers]
    case CREATE_STRETCH_ANSWER:
      return [...state, action.newStretchAnswer]
    case ADD_RECEIVED_STRETCH_ANSWER:
      return [...state, action.stretchAnswer]
    case UPDATE_STRETCH_ANSWER:
      return state.map(sa =>
        sa.id === action.stretchAnswerId ? action.updatedStretchAnswer : sa
      )
    default:
      return state
  }
}
