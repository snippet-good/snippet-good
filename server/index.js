const app = require('./app')
const { initDb } = require('./db/index')
const PORT = process.env.PORT || 3000
const socketio = require('socket.io')
const socketFunction = require('./socket')

initDb()
  .then(() => {
    const server = app.listen(PORT, () =>
      console.log(`listening on PORT ${PORT}`)
    )
    const io = socketio(server)
    socketFunction(io)
  })
  .catch(err => {
    console.log('unable to connect to server for following reason:')
    console.log(err)
  })
