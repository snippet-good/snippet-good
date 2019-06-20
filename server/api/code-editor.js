const router = require('express').Router()
const fs = require('fs')
const path = require('path')
const runUserCode = require('./code-edtior-functions')

module.exports = router

router.post('/runcode', (req, res, next) => {
  runUserCode(req.body)
    .then(result => res.json(result))
    .catch(err => {
      if (!req.body.fileName) return next(err)
      if (err.message.split(`${req.body.fileName}.js:`).length > 1) {
        err.message = err.message
          .split(`${req.body.fileName}.js:`)[1]
          .split(/\([0-9]+:[0-9]+\)/)[0]
      }
      next(err)
    })
})

router.delete('/:fileName', (req, res, next) => {
  const userFilesDir = path.join(__dirname, '..', '..', 'TempUserFiles')
  fs.unlink(path.join(userFilesDir, `${req.params.fileName}.js`), err => {
    if (err)
      console.log(
        `./TempUserFiles/${req.params.fileName}.js file does not exist`
      )
    console.log(`./TempUserFiles/${req.params.fileName}.js file deleted`)
    return fs.unlink(
      path.join(userFilesDir, `${req.params.fileName}.html`),
      error => {
        if (error)
          return console.log(
            `./TempUserFiles/${req.params.fileName}.html file does not exist`
          )
        res.sendStatus(204)
      }
    )
  })
})
