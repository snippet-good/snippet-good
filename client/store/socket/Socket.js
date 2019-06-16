import io from 'socket.io-client'
import { addComment } from '../comments/actions'
import { setFlashMessage } from '../flash-message/actions'
import { updateCohortStretch } from '../cohort-stretches/actions'

class Socket {
  constructor(userDetails, storeAPI) {
    this.storeAPI = storeAPI
    this.socket = io(`${window.location.origin}?userId=${userDetails.id}`)
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

    this.socket.on('timer-started', cohortStretch => {
      storeAPI.dispatch(updateCohortStretch(cohortStretch.id, cohortStretch))
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

  startStretchTimer(cohortStretch) {
    this.socket.emit('startStretchTimer', cohortStretch)
  }
}

export default Socket
