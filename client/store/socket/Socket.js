import io from 'socket.io-client'

class Socket {
  constructor(userId) {
    this.socket = io(`${window.location.origin}?userId=${userId}`)
    console.log('two-way connection has been made!')
  }

  /*connectUser(){
    this.socket = io(`window.location.origin`)
    this.connectUser.sock
    console.log('two-way connection has been made!')
  }*/

  disconnectUser() {
    this.socket.disconnect()
  }
}

export default Socket
