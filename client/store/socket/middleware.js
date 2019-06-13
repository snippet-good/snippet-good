import Socket from './Socket'
import { GET_USER_DETAILS, LOGOUT } from '../auth/actions'
import { CREATE_COMMENT } from '../comments/actions'
import { JOIN_COHORT_STRETCH_ROOM } from './actions'

const socketMiddleware = storeAPI => {
  let socket
  return next => action => {
    switch (action.type) {
      case GET_USER_DETAILS:
        socket = new Socket(action.userDetails.id, storeAPI)
        break
      case CREATE_COMMENT:
        socket.sendMessage(action.newComment, action.emitObject)
        break
      case LOGOUT:
        socket.disconnectUser()
        break
      case JOIN_COHORT_STRETCH_ROOM:
        socket.joinCohortStretchRoom(action.cohortStretchId)
        break
      default:
        break
    }

    return next(action)
  }
}

export default socketMiddleware
