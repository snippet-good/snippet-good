const socketFunction = socketServer => {
  socketServer.on('connect', socket => {
    console.log(`${socket.id} has connected`)
    socket.userId = socket.handshake.query.userId
    console.log(socketServer.sockets.clients())
    socket.on('disconnect', () => {
      console.log(`${socket.id} has disconnected`)
    })
  })
}

module.exports = socketFunction
