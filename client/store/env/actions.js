import axios from 'axios'

// --------------------------------------------------
// Action types

export const GET_GIPHY_API_KEY = 'GET_GIPHY_API_KEY'

// --------------------------------------------------
// Action creators

export const getGiphyApiKey = key => ({
  type: GET_GIPHY_API_KEY,
  key
})

// --------------------------------------------------
// Authentication thunks

export const getGiphyApiKeyThunk = () => {
  return dispatch => {
    return axios
      .get(`/api/env/giphy`)
      .then(response => response.data)
      .then(key => dispatch(getGiphyApiKey(key)))
  }
}
