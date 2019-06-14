const router = require('express').Router()
const util = require('util')
const fs = require('fs')
const path = require('path')

module.exports = router

const jsxStart = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <script
      crossorigin
      src="https://unpkg.com/react@16/umd/react.production.min.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"
    ></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.29/browser.js"></script>
  </head>
  <body>
    <div id="app"></div>

    <script type="text/babel">`
const jsxEnd = `        ;ReactDOM.render(<App />, document.querySelector('#app'))
                     </script>
                  </body>
                </html>`

router.post('/runcode', (req, res, next) => {
  try {
    const { code, fileName, language } = req.body

    if (language === 'jsx') {
      fs.writeFile(
        path.join(__dirname, '..', '..', 'TempUserFiles', `${fileName}.html`),
        `${jsxStart}${code}${jsxEnd}`,
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
