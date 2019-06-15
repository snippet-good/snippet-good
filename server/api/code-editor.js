const router = require('express').Router()
const util = require('util')
const fs = require('fs')
const path = require('path')
const { transform } = require('@babel/core')

module.exports = router

const writeFilePromise = (file, code) => {
  return new Promise((resolve, reject) => {
    return fs.writeFile(file, code, err => {
      if (err) reject(err)
      resolve('file created successfully')
    })
  })
}

const babelTransformPromise = (code, fileName) => {
  return new Promise((resolve, reject) => {
    return transform(code, { filename: fileName }, (error, result) => {
      if (error) {
        reject(new Error(error))
      } else {
        resolve(result.code)
      }
    })
  })
}

const jsxStart = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Document</title>
        <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
        <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
        <body>
        <div id="app"></div>
        <script>`

const jsxEnd = `
                </script>
            </body>
        </html>`

router.post('/runcode', (req, res, next) => {
  try {
    let { code, fileName, language } = req.body
    code = `${code}; ReactDOM.render(<App />, document.querySelector('#app'))`
    const userFilesDir = path.join(__dirname, '..', '..', 'TempUserFiles')
    if (language === 'jsx') {
      writeFilePromise(path.join(userFilesDir, `${fileName}.js`), code)
        .then(() => {
          return babelTransformPromise(
            code,
            path.join(userFilesDir, `${fileName}.js`)
          )
        })
        .then(transpiledCode => {
          return writeFilePromise(
            path.join(userFilesDir, `${fileName}.html`),
            `${jsxStart}${transpiledCode}${jsxEnd}`
          )
        })
        .then(() => res.send('html file successfully written'))
        .catch(err => next(err))
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

router.delete('/:fileName', (req, res, next) => {
  const userFilesDir = path.join(__dirname, '..', '..', 'TempUserFiles')
  fs.unlink(path.join(userFilesDir, `${req.params.fileName}.js`), err => {
    if (err) throw err
    return fs.unlink(
      path.join(userFilesDir, `${req.params.fileName}.html`),
      error => {
        if (error) throw error
        res.send('files successfully deleted')
      }
    )
  })
})
