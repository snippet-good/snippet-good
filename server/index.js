const app = require('./app')
const { initDb } = require('./db/index')
const PORT = process.env.PORT || 3000
const socket = require('./socket')

initDb()
  .then(() => {
    const server = app.listen(PORT, () =>
      console.log(`listening on PORT ${PORT}`)
    )
    const io = socket(server)
  })
  .catch(err => {
    console.log('unable to connect to server for following reason:')
    console.log(err)
  })
