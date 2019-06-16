import io from 'socket.io-client'
import { addComment } from '../comments/actions'
import { setFlashMessage } from '../flash-message/actions'
import {
  startStretchTimer,
  updateCohortStretch
} from '../cohort-stretches/actions'

class Socket {
  constructor(userDetails, storeAPI) {
    this.storeAPI = storeAPI
    this.socket = io(`${window.location.origin}?userId=${userDetails.id}`)
    console.log(this.socket.userDetails)
    this.socket.emit('initializeRoom', userDetails)

    console.log('two-way connection has been made!')

    this.socket.on(
      'messageSent',
      (commentObject, stretchTitle, cohortName, studentId) => {
        const { writerName, stretchanswerId } = commentObject
        const { isAdmin } = storeAPI.getState().userDetails
        const message = `${writerName} just commented on ${stretchTitle} in ${cohortName} `
        const link = `/${
          isAdmin ? 'admin' : 'student'
        }/stretchAnswer/${stretchanswerId}${
          isAdmin ? `/student/${studentId}` : ''
        }`
        storeAPI.dispatch(addComment(commentObject))
        storeAPI.dispatch(setFlashMessage(message, link))
      }
    )

    this.socket.on('startStretchTimer', cohortStretch => {
      storeAPI.dispatch(updateCohortStretch(cohortStretch.id, cohortStretch))
    })

    this.socket.on('timer-started', cohortStretchId => {
      storeAPI.dispatch(startStretchTimer(cohortStretchId))
    })
  }

  disconnectUser() {
    this.socket.disconnect()
  }

  sendMessage(commentObject, emitObject) {
    if (typeof this.socket.emit === 'function') {
      this.socket.emit('sendMessage', commentObject, emitObject)
    } else {
      console.log('socket not connected')
    }
  }

  joinCohortStretchRoomAdmin(cohortStretch) {
    this.socket.emit('joinCohortStretchRoomAdmin', cohortStretch)
  }

  joinCohortStretchRoom(cohortStretchId) {
    this.socket.emit('joinCohortStretchRoom', cohortStretchId)
    const { isAdmin } = this.storeAPI.getState().userDetails
    if (isAdmin) {
      this.storeAPI.dispatch(startStretchTimer(cohortStretchId))
    }
    this.socket.on('success', msg => console.log(msg))
  }

  startStretchTimer(cohortStretch) {
    this.socket.emit('startStretchTimer', cohortStretch)
  }
}

export default Socket
