import { SET_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from './actions'

export default (state = {}, action) => {
  switch (action.type) {
    case SET_FLASH_MESSAGE:
      return action.message
    case DELETE_FLASH_MESSAGE:
      return {}
    default:
      return state
  }
}
