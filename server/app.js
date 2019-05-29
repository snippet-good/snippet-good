const express = require('express')
const path = require('path')
const volleyball = require('volleyball')
const session = require('express-session')
const app = express()
const students = require('./api/students')

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

// routers
app.use('/api', require('./api'))
app.use('/api/students', students)

//route for serving up index.html
app.get('/', (req, res, next) => {
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
