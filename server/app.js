const express = require('express')
const path = require('path')
const volleyball = require('volleyball')
const session = require('express-session')
const app = express()

//setting up express-session, volleyball logging, json parsing, and serving up static files
app.use(
  session({
    secret: "doesn't feel very secret",
    resave: false,
    saveUninitialized: false
  })
)
app.use(volleyball)
app.use(express.json())
app.use('/public', express.static(path.join(__dirname, '..', 'public')))
app.use('/temp', express.static(path.join(__dirname, '..', 'temp')))

// routers
app.use('/api', require('./api'))

//route for serving up index.html
app.get('/', (req, res, next) => {
  console.log(__dirname)
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'))
})

//error handling middleware
app.use((err, req, res, next) => {
  let error
  const status = err.status || 500
  if (err.errors) {
    error = err.errors.map(currentError => currentError.message)
  } else {
    error = err.message
  }
  console.log(error)
  res.status(status).send(error)
})

module.exports = app
