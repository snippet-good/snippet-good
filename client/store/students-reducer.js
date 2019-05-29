import { GET_STUDENTS } from './actions'

export default (state = [], action) => {
  switch (action.type) {
    case GET_STUDENTS:
      state = action.students
      return state
    default:
      return state
  }
}
