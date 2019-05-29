import axios from 'axios'

// --------------------------------------------------
// Action types

export const GET_CATEGORIES = 'GET_CATEGORIES'
export const CREATE_CATEGORY = 'CREATE_CATEGORY'

// --------------------------------------------------
// Action creators

const getCategories = categories => ({ type: GET_CATEGORIES, categories })
const createUser = newUser => ({ type: CREATE_USER, newUser })

// --------------------------------------------------
// CRUD thunks

// Redux thunk to get all users from API
export const getAllCategories = () => dispatch => {
  return axios
    .get('/api/categories')
    .then(res => dispatch(getCategories(res.data)))
}
