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

    socket.on('sendMessage', (commentObject, emitObject) => {
      console.log(emitObject)
      console.log(commentObject)
      console.log(socket.id)
      const { relatedUsers, stretchTitle, cohortName } = emitObject
      /* if (usersToSendTo.includes(socketIdsToUserIdsMap[socket.id])) {
        socket.to(`${socket.id}`).emit('messageSent', commentObject)
      }*/

      for (let i = 0; i < relatedUsers.length; ++i) {
        if (socketIdsToUserIdsMap[relatedUsers[i]]) {
          socket
            .to(`${socketIdsToUserIdsMap[relatedUsers[i]]}`)
            .emit('messageSent', commentObject, stretchTitle, cohortName)
        }
      }
    })
  })
}

module.exports = socketFunction
