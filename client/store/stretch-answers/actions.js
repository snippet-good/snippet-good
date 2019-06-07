import axios from 'axios'

// --------------------------------------------------
// Action types

export const GET_STRETCH_ANSWERS = 'GET_STRETCH_ANSWERS'
export const CREATE_STRETCH_ANSWER = 'CREATE_STRETCH_ANSWER'
export const UPDATE_STRETCH_ANSWER = 'UPDATE_STRETCH_ANSWER'
export const DELETE_STRETCH_ANSWER = 'DELETE_STRETCH_ANSWER'

// --------------------------------------------------
// Action creators

const getStretchAnswers = stretchAnswers => ({
  type: GET_STRETCH_ANSWERS,
  stretchAnswers
})

const createStretchAnswer = newStretchAnswer => ({
  type: CREATE_STRETCH_ANSWER,
  newStretchAnswer
})

const replaceStretchAnswer = updatedStretchAnswer => ({
  type: UPDATE_STRETCH_ANSWER,
  updatedStretchAnswer
})

const removeStretchAnswer = stretchAnswerId => ({
  type: DELETE_STRETCH_ANSWER,
  stretchAnswerId
})

// --------------------------------------------------
// CRUD thunks

// Redux thunk to get all users from API
export const getAllStretchAnswers = () => dispatch => {
  return axios
    .get('/api/stretch-answers')
    .then(res => dispatch(getStretchAnswers(res.data)))
}

export const getStretchAnswersOfSingleAdminThunk = adminId => dispatch => {
  return axios
    .get(`/api/stretch-answers/admin/${adminId}`)
    .then(res => dispatch(getStretchAnswers(res.data)))
}

export const createStretchAnswerThunk = newStretchAnswer => dispatch => {
  console.log('called')
  console.log(newStretchAnswer)
  return axios
    .post(`/api/stretch-answers/create`, { newStretchAnswer })
    .then(res => res.data)
    .then(stretchAnswer => dispatch(createStretchAnswer(stretchAnswer)))
}
