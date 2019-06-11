// --------------------------------------------------
// Action types

export const SET_FLASH_MESSAGE = 'SET_FLASH_MESSAGE'
export const DELETE_FLASH_MESSAGE = 'DELETE_FLASH_MESSAGE'

// --------------------------------------------------
// Action creators

export const setFlashMessage = (message, link) => ({
  type: SET_FLASH_MESSAGE,
  message: { message, link }
})

export const deleteFlashMessage = () => ({
  type: DELETE_FLASH_MESSAGE
})
