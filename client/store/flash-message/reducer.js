import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from './actions'

export default (state = [], action) => {
  switch (action.type) {
    case ADD_FLASH_MESSAGE:
      return [...state, action.message]
    case DELETE_FLASH_MESSAGE:
      return state.filter(message => message.id !== action.messageId)
    default:
      return state
  }
}
