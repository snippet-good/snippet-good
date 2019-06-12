import axios from 'axios'

// --------------------------------------------------
// Action types

export const GET_COMMENTS = 'GET_COMMENTS'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'

// --------------------------------------------------
// Action creators

const getComments = comments => ({ type: GET_COMMENTS, comments })
const createComment = (newComment, emitObject) => ({
  type: CREATE_COMMENT,
  newComment,
  emitObject
})

export const addComment = comment => ({
  type: ADD_COMMENT,
  comment
})

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

export const createCommentThunk = (newComment, emitObject) => {
  return dispatch => {
    return axios
      .post('/api/comments', newComment)
      .then(({ data }) => dispatch(createComment(data, emitObject)))
  }
}
