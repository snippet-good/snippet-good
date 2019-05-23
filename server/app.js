const express = require('express')
const path = require('path')
const volleyball = require('volleyball')
const session = require('express-session')
const app = express()
const auth = require('./api/auth')

module.exports = app

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

//routers
app.use('/api/auth', auth)

//route for serving up index.html
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'))
})

//error handling middleware
app.use((err, req, res, next) => {
  let error
  if (err.errors) {
    error = err.errors.map(currentError => currentError.message)
  } else {
    error = err
  }
  console.log(error)
  res.status(error.status || 500).send(error)
})
