const app = require('./app')
const { initDb } = require('./db/index')
const socketio = require('socket.io')
const socketServer = require('./socket')
const PORT = process.env.PORT || 3000

initDb()
  .then(() => {
    const server = app.listen(PORT, () =>
      console.log(`listening on PORT ${PORT}`)
    )
    const io = socketio(server)
    socketServer(io)
    socketServer(io, '/test')
  })
  .catch(err => {
    console.log('unable to connect to server for following reason:')
    console.log(err)
  })
