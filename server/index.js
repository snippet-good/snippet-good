const app = require('./app')
const { initDb } = require('./db/index')
const PORT = process.env.PORT || 3000

initDb()
  .then(() => app.listen(PORT, () => console.log(`listening on PORT ${PORT}`)))
  .catch(err => {
    console.log('unable to connect to server for following reason:')
    console.log(err)
  })
