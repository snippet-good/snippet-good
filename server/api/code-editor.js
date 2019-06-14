const router = require('express').Router()
const util = require('util')
const fs = require('fs')
const path = require('path')

module.exports = router

router.post('/runcode', (req, res, next) => {
  try {
    const { code, fileName, language } = req.body

    if (language === 'jsx') {
      fs.writeFile(
        path.join(__dirname, '..', '..', 'TempUserFiles', `${fileName}.html`),
        'rt',
        err => {
          if (err) throw err
          res.send('file successfully written')
        }
      )
    }

    if (language === 'javascript') {
      let result = ''
      const myConsoleLog = (...args) => {
        result = `${result}${util.format(...args)}\n`
      }

      const alteredCode = code.replace(/console\.log/g, 'myConsoleLog')
      eval(alteredCode)
      res.send(result)
    }
  } catch (error) {
    next(error)
  }
})
