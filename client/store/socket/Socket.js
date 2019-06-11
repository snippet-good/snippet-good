import io from 'socket.io-client'
import { addComment } from '../comments/actions'

class Socket {
  constructor(userId, storeAPI) {
    this.socket = io(`${window.location.origin}?userId=${userId}`)
    console.log('two-way connection has been made!')

    this.socket.on('messageSent', commentObject => {
      console.log('reached back')
      storeAPI.dispatch(addComment(commentObject))
    })
  }

  disconnectUser() {
    this.socket.disconnect()
  }

  sendMessage(commentObject, usersToSendTo) {
    if (typeof this.socket.emit === 'function') {
      console.log('here')
      this.socket.emit('sendMessage', commentObject, usersToSendTo)
    } else {
      console.log('socket not connected')
    }
  }
}

export default Socket
