const express = require('express')
const path = require('path')
const volleyball = require('volleyball')
const session = require('express-session')
const app = express()
const auth = require('./api/auth')
<<<<<<< HEAD
const cohortStretch = require('./api/cohort-stretch-routes')
=======
const codeeditor = require('./api/codeeditor')
>>>>>>> 9f1cfc1cfc9e939af235e87506a9930321d82367

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
<<<<<<< HEAD
app.use('/api/cohortStretch', cohortStretch)
=======
app.use('/api/code', codeeditor)
>>>>>>> 9f1cfc1cfc9e939af235e87506a9930321d82367

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
