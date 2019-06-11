import io from 'socket.io-client'
import { addComment } from '../comments/actions'
import { setFlashMessage } from '../flash-message/actions'

class Socket {
  constructor(userId, storeAPI) {
    this.socket = io(`${window.location.origin}?userId=${userId}`)
    console.log('two-way connection has been made!')

    this.socket.on('messageSent', (commentObject, stretchTitle, cohortName) => {
      console.log('reached back')
      const { writerName } = commentObject
      //storeAPI.getState().stretchAnswers.find()
      const message = `${writerName} just commented on ${stretchTitle} in ${cohortName} `
      storeAPI.dispatch(addComment(commentObject))
      storeAPI.dispatch(setFlashMessage(message))
    })
  }

  disconnectUser() {
    this.socket.disconnect()
  }

  sendMessage(commentObject, emitObject) {
    if (typeof this.socket.emit === 'function') {
      console.log('here')
      this.socket.emit('sendMessage', commentObject, emitObject)
    } else {
      console.log('socket not connected')
    }
  }
}

export default Socket
