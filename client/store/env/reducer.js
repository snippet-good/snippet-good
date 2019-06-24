import { GET_GIPHY_API_KEY } from './actions'

export default (state = [], action) => {
  switch (action.type) {
    case GET_GIPHY_API_KEY:
      return [...state, action.key]
    default:
      return state
  }
}
