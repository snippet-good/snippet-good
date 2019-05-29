const router = require('express').Router()
const db = require('../db/db')
const util = require('util')

const TestTable = db.define('testtable', {
  body: db.Sequelize.TEXT
})

module.exports = router

router.get('/', (req, res, next) => {
  TestTable.findByPk(1)
    .then(s => res.json(s))
    .catch(next)
})

router.post('/', (req, res, next) => {
  TestTable.create(req.body)
    .then(s => res.json(s))
    .catch(next)
})

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
