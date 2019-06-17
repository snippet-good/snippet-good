import io from 'socket.io-client'
import { addComment } from '../comments/actions'
import { addFlashMessage } from '../flash-message/actions'
import { updateCohortStretch } from '../cohort-stretches/actions'
import {
  addReceivedStretchAnswer,
  replaceStretchAnswer
} from '../stretch-answers/actions'
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
        const flashMessageObject = this.generateFlashMessageObjectForComment(
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

    this.socket.on('answerSubmitted', stretchAnswer => {
      storeAPI.dispatch(addReceivedStretchAnswer(stretchAnswer))
    })

    this.socket.on('receivedAnswerRating', updatedStretchAnswer => {
      const { id } = updatedStretchAnswer
      storeAPI.dispatch(replaceStretchAnswer(id, updatedStretchAnswer, false))
      storeAPI.dispatch(
        addFlashMessage(
          this.generateFlashMessageObjectForRatedAnswer(updatedStretchAnswer)
        )
      )
    })
  }

  getIdAndBodyOfNewFlashMessage = (type, cohortStretch) => {
    const { stretches, flashMessages } = this.storeAPI.getState()
    const { title } = stretches.find(s => s.id === cohortStretch.stretchId)
    const { cohortName } = cohortStretch
    const typeMessageMap = {
      stretchOpened: `Stretch ${title} is now open in ${cohortName}`,
      receivedAnswerRating: `Your stretch ${title} in cohort ${cohortName} has been rated`
    }
    return {
      id: generateFlashMessageId(flashMessages, type),
      body: typeMessageMap[type]
    }
  }

  generateFlashMessageObjectForRatedAnswer = updatedStretchAnswer => {
    const { cohortStretches } = this.storeAPI.getState()
    const selectedCohortStretch = cohortStretches.find(
      cs => cs.id === updatedStretchAnswer.cohortstretchId
    )
    const idAndBody = this.getIdAndBodyOfNewFlashMessage(
      'receivedAnswerRating',
      selectedCohortStretch
    )
    return {
      ...idAndBody,
      linkLabel: 'Click here to see it',
      link: `/student/stretchAnswer/${updatedStretchAnswer.id}`
    }
  }

  generateFlashMessageObjectForOpenStretch = cohortStretch => {
    let commonObject = this.getIdAndBodyOfNewFlashMessage(
      'stretchOpened',
      cohortStretch
    )

    if (this.storeAPI.getState().userDetails.isAdmin) return commonObject
    return {
      ...commonObject,
      linkLabel: 'Click here to answer',
      link: `/student/stretch/${cohortStretch.id}`
    }
  }

  generateFlashMessageObjectForComment = (
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

  sendStretchAnswer(stretchAnswer, adminIds) {
    this.socket.emit('sendAnswer', stretchAnswer, adminIds)
  }

  sendAnswerRating(updatedStretchAnswer) {
    this.socket.emit('answerRated', updatedStretchAnswer)
  }
}

export default Socket
