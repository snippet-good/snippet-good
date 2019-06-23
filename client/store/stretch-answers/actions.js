import axios from 'axios'

// --------------------------------------------------
// Action types

export const GET_STRETCH_ANSWERS = 'GET_STRETCH_ANSWERS'
export const CREATE_STRETCH_ANSWER = 'CREATE_STRETCH_ANSWER'
export const UPDATE_STRETCH_ANSWER = 'UPDATE_STRETCH_ANSWER'
export const DELETE_STRETCH_ANSWER = 'DELETE_STRETCH_ANSWER'
export const ADD_RECEIVED_STRETCH_ANSWER = 'ADD_RECEIVED_STRETCH_ANSWER'

// --------------------------------------------------
// Action creators

const getStretchAnswers = stretchAnswers => ({
  type: GET_STRETCH_ANSWERS,
  stretchAnswers
})

export const createStretchAnswer = (newStretchAnswer, adminIds) => ({
  type: CREATE_STRETCH_ANSWER,
  newStretchAnswer,
  adminIds
})

export const addReceivedStretchAnswer = stretchAnswer => ({
  type: ADD_RECEIVED_STRETCH_ANSWER,
  stretchAnswer
})

export const replaceStretchAnswer = (
  stretchAnswerId,
  updatedStretchAnswer,
  emit
) => ({
  type: UPDATE_STRETCH_ANSWER,
  stretchAnswerId,
  updatedStretchAnswer,
  emit
})

const removeStretchAnswer = stretchAnswerId => ({
  type: DELETE_STRETCH_ANSWER,
  stretchAnswerId
})

// --------------------------------------------------
// CRUD thunks

// Redux thunk to get all users from API
export const getAllStretchAnswersThunk = () => dispatch => {
  return axios
    .get('/api/stretch-answers')
    .then(res => dispatch(getStretchAnswers(res.data)))
}

export const getAnswersOfCohortsOfStudentThunk = studentId => dispatch => {
  return axios
    .get(`/api/stretch-answers/student/${studentId}`)
    .then(res => dispatch(getStretchAnswers(res.data)))
}

export const createStretchAnswerThunk = (
  newStretchAnswer,
  attendance,
  adminIds
) => dispatch => {
  return axios
    .post(`/api/stretch-answers/create`, { newStretchAnswer, attendance })
    .then(res => res.data)
    .then(stretchAnswer =>
      dispatch(createStretchAnswer(stretchAnswer, adminIds))
    )
}

export const updateStretchAnswerThunk = (stretchAnswerId, updatedFields) => {
  return dispatch => {
    return axios
      .put(`/api/stretch-answers/${stretchAnswerId}`, updatedFields)
      .then(res => res.data)
      .then(stretchAnswer =>
        dispatch(replaceStretchAnswer(stretchAnswerId, stretchAnswer, true))
      )
  }
}
