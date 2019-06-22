const socketFunction = socketServer => {
  const socketIdsToUserIdsMap = {}
  socketServer.on('connect', socket => {
    console.log(`${socket.id} has connected`)
    socketIdsToUserIdsMap[socket.handshake.query.userId] = socket.id

    socket.on('disconnect', () => {
      console.log(`${socket.id} has disconnected`)
      for (let key in socketIdsToUserIdsMap) {
        if (socketIdsToUserIdsMap[key] === socket.id) {
          delete socketIdsToUserIdsMap[key]
          break
        }
      }
    })

    socket.on('initializeRoom', userDetails => {
      userDetails.cohortIds.forEach(cohortId => {
        socket.join(cohortId)
        console.log(
          `${userDetails.id} has joined the room for cohortId ${cohortId}`
        )
      })
    })

    socket.on('sendMessage', (commentObject, emitObject) => {
      const { relatedUsers, stretchTitle, cohortName, studentId } = emitObject

      for (let i = 0; i < relatedUsers.length; ++i) {
        if (socketIdsToUserIdsMap[relatedUsers[i]]) {
          socket
            .to(`${socketIdsToUserIdsMap[relatedUsers[i]]}`)
            .emit(
              'messageSent',
              commentObject,
              stretchTitle,
              cohortName,
              studentId
            )
        }
      }
    })

    socket.on('startStretchTimer', cohortStretch => {
      socket.to(cohortStretch.cohortId).emit('timer-started', cohortStretch)
      console.log('received request to start stretch timer')
    })

    socket.on('sendAnswer', (stretchAnswer, adminIds) => {
      adminIds.forEach(adminId => {
        if (socketIdsToUserIdsMap[adminId]) {
          socket
            .to(`${socketIdsToUserIdsMap[adminId]}`)
            .emit('answerSubmitted', stretchAnswer)
        }
      })
    })

    socket.on('answerRated', updatedStretchAnswer => {
      const { userId } = updatedStretchAnswer
      if (socketIdsToUserIdsMap[userId]) {
        socket
          .to(`${socketIdsToUserIdsMap[userId]}`)
          .emit('receivedAnswerRating', updatedStretchAnswer)
      }
    })

    socket.on('stretchCreated', newStretch => {
      socket.broadcast.emit('receivedNewStretch', newStretch)
    })
  })
}

module.exports = socketFunction
