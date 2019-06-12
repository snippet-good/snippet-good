import { GET_STRETCH_ANSWERS, CREATE_STRETCH_ANSWER } from './actions'

export default (state = [], action) => {
  switch (action.type) {
    case GET_STRETCH_ANSWERS:
      return [...action.stretchAnswers]
    case CREATE_STRETCH_ANSWER:
      return [...state, action.newStretchAnswer]
    default:
      return state
  }
}
