const socketio = require('socket.io')

const generateSocket = server => {
  const io = socketio(server)

  io.on('connect', socket => {
    console.log(`${socket.id} has connected`)
    socket.userId = socket.handshake.query.userId
    socket.on('disconnect', () => {
      console.log(`${socket.id} has dosconnected`)
    })
  })

  return io
}

module.exports = generateSocket
