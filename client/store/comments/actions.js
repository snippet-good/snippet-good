import axios from 'axios'

// --------------------------------------------------
// Action types

export const GET_COMMENTS = 'GET_COMMENTS'

// --------------------------------------------------
// Action creators

const getComments = comments => ({ type: GET_COMMENTS, comments })
//const createCategory = newCategory => ({ type: CREATE_CATEGORY, newCategory })

// --------------------------------------------------
// CRUD thunks

// Redux thunk to get all categories from API
export const getCommentsOfStretchAnswerThunk = stretchAnswerId => {
  return dispatch => {
    return axios
      .get(`/api/comments/stretchAnswer/${stretchAnswerId}`)
      .then(res => dispatch(getComments(res.data)))
  }
}
