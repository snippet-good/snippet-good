const socketFunction = socketServer => {
  const socketIdsToUserIdsMap = {}
  socketServer.on('connect', socket => {
    console.log(`${socket.id} has connected`)
    socketIdsToUserIdsMap[socket.handshake.query.userId] = socket.id

    console.log(socketIdsToUserIdsMap)

    socket.on('disconnect', () => {
      console.log(`${socket.id} has disconnected`)
      // delete socketIdsToUserIdsMap[socket.id]
      for (let key in socketIdsToUserIdsMap) {
        if (socketIdsToUserIdsMap[key] === socket.id) {
          delete socketIdsToUserIdsMap[key]
          break
        }
      }

      console.log(socketIdsToUserIdsMap)
    })

    socket.on('sendMessage', (commentObject, usersToSendTo) => {
      console.log(usersToSendTo)
      console.log(commentObject)
      console.log(socket.id)
      /* if (usersToSendTo.includes(socketIdsToUserIdsMap[socket.id])) {
        socket.to(`${socket.id}`).emit('messageSent', commentObject)
      }*/

      for (let i = 0; i < usersToSendTo.length; ++i) {
        if (socketIdsToUserIdsMap[usersToSendTo[i]]) {
          socket
            .to(`${socketIdsToUserIdsMap[usersToSendTo[i]]}`)
            .emit('messageSent', commentObject)
        }
      }
    })
  })
}

module.exports = socketFunction
