import axios from 'axios'

// --------------------------------------------------
// Action types

export const GET_STRETCHES = 'GET_STRETCHES'
export const CREATE_STRETCH = 'CREATE_STRETCH'
export const UPDATE_STRETCH = 'UPDATE_STRETCH'
export const DELETE_STRETCH = 'DELETE_STRETCH'

// --------------------------------------------------
// Action creators

const getStretches = stretches => ({ type: GET_STRETCHES, stretches })
const addStretch = newStretch => ({ type: CREATE_STRETCH, newStretch })
const replaceStretch = updatedStretch => ({
  type: UPDATE_STRETCH,
  updatedStretch
})
const removeStretch = stretchId => ({ type: DELETE_STRETCH, stretchId })

// --------------------------------------------------
// CRUD thunks

// Redux thunk to get all users from API
export const getAllStretches = () => dispatch => {
  return axios
    .get('/api/stretches')
    .then(res => dispatch(getStretches(res.data)))
}

// Redux thunk for creating a new stretch
export const createStretch = newStretch => dispatch => {
  return axios
    .post('/api/stretches', newStretch)
    .then(res =>
      console.log('Axios POST to /api/stretches was successful:', res.data)
    )
}

export const updateStretch = updatedStretch => dispatch => {
  return axios
    .put('/api/stretches', updatedStretch)
    .then(res =>
      console.log('Axios PUT to /api/stretches was successful:', res.data)
    )
}

// Redux thunk for searching stretches by keyword
export const searchStretches = searchTerm => dispatch => {
  return axios
    .get('/api/stretches')
    .then(res => res.data)
    .then(stretches =>
      stretches.filter(stretch =>
        stretch.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .then(stretches => dispatch(getStretches(stretches)))
}
