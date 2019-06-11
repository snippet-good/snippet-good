import Socket from './Socket'
import { GET_USER_DETAILS, LOGOUT } from '../auth/actions'
import { CREATE_COMMENT } from '../comments/actions'

const socketMiddleware = storeAPI => {
  let socket
  return next => action => {
    switch (action.type) {
      case GET_USER_DETAILS:
        socket = new Socket(action.userDetails.id, storeAPI)
        break
      case CREATE_COMMENT:
        socket.sendMessage(action.newComment, action.relatedUsers)
        break
      case LOGOUT:
        socket.disconnectUser()
        break
      default:
        break
    }

    return next(action)
  }
}

export default socketMiddleware
