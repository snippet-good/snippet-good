export const GET_USER = 'GET_USER'

export const getUser = user => {
  return {
    type: GET_USER,
    user
  }
}
