// --------------------------------------------------
// Action types

export const SET_FLASH_MESSAGE = 'SET_FLASH_MESSAGE'
export const DELETE_FLASH_MESSAGE = 'DELETE_FLASH_MESSAGE'
export const ADD_FLASH_MESSAGE = 'ADD_FLASH_MESSAGE'

// --------------------------------------------------
// Action creators

export const setFlashMessage = (message, link) => ({
  type: SET_FLASH_MESSAGE,
  message: { message, link }
})

export const addFlashMessage = message => ({
  type: ADD_FLASH_MESSAGE,
  message
})

export const deleteFlashMessage = messageId => ({
  type: DELETE_FLASH_MESSAGE,
  messageId
})
