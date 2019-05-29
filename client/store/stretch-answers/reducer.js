import { GET_STRETCH_ANSWERS } from './actions'

export default (state = [], action) => {
  switch (action.type) {
    case GET_STRETCH_ANSWERS:
      return [...action.stretchAnswers]

    default:
      return state
  }
}
