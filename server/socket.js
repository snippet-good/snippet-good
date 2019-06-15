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

    socket.on('joinCohortStretchRoomAdmin', cohortStretch => {
      socket.join(cohortStretch.id)
      console.log(`admin has joined room ${cohortStretch.id}`)
      socket.to(cohortStretch.id).emit('startStretchTimer', cohortStretch)
    })

    socket.on('joinCohortStretchRoom', cohortStretchId => {
      console.log('at start of listing to joinCSroom')
      socket.join(cohortStretchId)
      console.log('have completed joinCSroom')

      if (cohortStretchId) {
        return socketServer.emit(
          'success',
          `you have joined room for cohort stretch id ${cohortStretchId}`
        )
      } else {
        return socketServer.emit(
          'err',
          `the room for cohort stretch Id ${cohortStretchId} does not exist`
        )
      }
    })

    socket.on('startStretchTimer', cohortStretch => {
      console.log('at start of listing to startST')

      socket.to(cohortStretch.cohortId).emit('timer-started', cohortStretch)
      console.log('received request to start stretch timer')
    })
  })
}

module.exports = socketFunction
