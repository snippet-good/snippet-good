import io from 'socket.io-client'

const createSocket = (namespace, storeAPI) => {
  console.log(window.location.origin)
  const socket = io(`${window.location.origin}${namespace || ''}`)

  socket.on('connect', () => {
    console.log('two-way connection established')
  })

  socket.on('GETTING_DRAW', () => {
    console.log('in gertting draw')
    storeAPI.dispatch({ type: 'GET_USER', user: { name: 'Joe' } })
  })

  socket.sendDraw = () => {
    socket.emit('draw')
  }

  socket.sendUser = userId => {
    socket.emit('sendUser', userId)
  }

  return socket
}

export default createSocket
