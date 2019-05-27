const socketServer = (io, namespace) => {
  io.of(namespace || '/').on('connection', socket => {
    console.log(`${socket.id} has ocnnected`)
    socket.intenretsays = 'I SHOULD SEE YOU'
    console.log(io.sockets.clients())
    socket.on('draw', () => {
      console.log('lidtening for draw event')
      io.emit('GETTING_DRAW')
    })

    socket.on('disconnect', () => console.log(`${socket.id} has ocnnected`))
  })
}

module.exports = socketServer
