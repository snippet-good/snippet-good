import io from 'socket.io-client'

const createSocket = namespace => {
  console.log(window.location.origin)
  const socket = io(`${window.location.origin}${namespace || ''}`)
  socket.testAdding = 'SHOULD BE ABLE TO DO THIS'
  socket.sendDraw = () => {
    socket.emit('draw')
  }
  return socket
}

export default createSocket
