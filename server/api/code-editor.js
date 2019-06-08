const router = require('express').Router()
const db = require('../db/db')
const util = require('util')

module.exports = router

router.post('/runcode', (req, res, next) => {
  let result = ''
  const myConsoleLog = (...args) => {
    result = `${result}${util.format(...args)}\n`
  }

  try {
    const alteredCode = req.body.code.replace(/console\.log/g, 'myConsoleLog')
    eval(alteredCode)
    res.send(result)
  } catch (error) {
    next(error)
  }
})
