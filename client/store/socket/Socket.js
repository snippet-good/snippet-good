import io from 'socket.io-client'
import { addComment } from '../comments/actions'
import { addFlashMessage } from '../flash-message/actions'
import { updateCohortStretch } from '../cohort-stretches/actions'
import { generateFlashMessageId } from '../../utilityfunctions'

class Socket {
  constructor(userDetails, storeAPI) {
    this.storeAPI = storeAPI
    this.socket = io(`${window.location.origin}?userId=${userDetails.id}`)
    this.socket.emit('initializeRoom', userDetails)

    console.log('two-way connection has been made!')

    this.socket.on(
      'messageSent',
      (commentObject, stretchTitle, cohortName, studentId) => {
        const flashMessageObject = this.generateFlashMessageObjectForMessage(
          commentObject,
          stretchTitle,
          cohortName,
          studentId
        )
        storeAPI.dispatch(addComment(commentObject))
        storeAPI.dispatch(addFlashMessage(flashMessageObject))
      }
    )

    this.socket.on('timer-started', cohortStretch => {
      storeAPI.dispatch(updateCohortStretch(cohortStretch.id, cohortStretch))
      storeAPI.dispatch(
        addFlashMessage(
          this.generateFlashMessageObjectForOpenStretch(cohortStretch)
        )
      )
    })

    this.socket.on('stretch-closed', cohortStretch => {
      storeAPI.dispatch(updateCohortStretch(cohortStretch.id, cohortStretch))
    })
  }

  generateFlashMessageObjectForOpenStretch = cohortStretch => {
    const { stretches, flashMessages, userDetails } = this.storeAPI.getState()
    const { title } = stretches.find(s => s.id === cohortStretch.stretchId)
    const { id, cohortName } = cohortStretch
    let commonObject = {
      id: generateFlashMessageId(flashMessages, 'stretchOpened'),
      body: `Stretch ${title} is now open in ${cohortName}`
    }
    if (userDetails.isAdmin) return commonObject
    return {
      ...commonObject,
      linkLabel: 'Click here to answer',
      link: `/student/stretch/${id}`
    }
  }

  generateFlashMessageObjectForMessage = (
    commentObject,
    stretchTitle,
    cohortName,
    studentId
  ) => {
    const { writerName, stretchanswerId } = commentObject
    const { isAdmin } = this.storeAPI.getState().userDetails
    const message = `${writerName} just commented on ${stretchTitle} in ${cohortName} `
    const link = `/${
      isAdmin ? 'admin' : 'student'
    }/stretchAnswer/${stretchanswerId}${isAdmin ? `/student/${studentId}` : ''}`
    const id = generateFlashMessageId(
      this.storeAPI.getState().flashMessages,
      'messageSent'
    )
    return {
      id,
      body: message,
      linkLabel: 'Click here to see it',
      link
    }
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

  sendClosedStretch(cohortStretch) {
    this.socket.emit('sendClosedStretch', cohortStretch)
  }

  sendStretchAnswer
}

export default Socket
