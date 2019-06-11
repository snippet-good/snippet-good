import axios from 'axios'

// --------------------------------------------------
// Action types

export const GET_COMMENTS = 'GET_COMMENTS'
export const CREATE_COMMENT = 'CREATE_COMMENT'

// --------------------------------------------------
// Action creators

const getComments = comments => ({ type: GET_COMMENTS, comments })
const createComment = (newComment, relatedUsers) => ({
  type: CREATE_COMMENT,
  newComment,
  relatedUsers
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

export const createCommentThunk = (newComment, relatedUsers) => {
  return dispatch => {
    return axios
      .post('/api/comments', newComment)
      .then(({ data }) => dispatch(createComment(data, relatedUsers)))
  }
}
