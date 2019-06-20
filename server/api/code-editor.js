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
    if (err) console.log(err)
    return fs.unlink(
      path.join(userFilesDir, `${req.params.fileName}.html`),
      error => {
        if (error) return console.log(error)
        res.send('files successfully deleted')
      }
    )
  })
})
