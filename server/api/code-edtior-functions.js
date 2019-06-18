const util = require('util')
const fs = require('fs')
const path = require('path')
const { transform } = require('@babel/core')
const { NodeVM } = require('vm2')

//function to ocnvert fs.writeFIle from one with callbacks to a promise
const writeFilePromise = (file, code) => {
  return new Promise((resolve, reject) => {
    return fs.writeFile(file, code, err => {
      if (err) reject(err)
      resolve('file created successfully')
    })
  })
}

//function to convert transform function in Babel API from one with callbacks to promise
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

//run Babel transpiled code before putting in HTML file to
// (1) pick up any runtime errors
// (2) save console.log statements
const runTranspiledCode = (transpiledCode, fileName) => {
  let result = ''
  const myConsoleLog = (...args) => {
    result = `${result}${util.format(...args)}\n`
  }
  const vm = new NodeVM({
    sandbox: {
      myConsoleLog,
      document: { querySelector: () => {} },
      ReactDOM: { render: () => {} }
    },
    require: {
      external: ['react'],
      import: ['react']
    }
  })
  vm.run(
    `const React = require('react'); ${transpiledCode.replace(
      /console\.log/g,
      'myConsoleLog'
    )} App()`,
    `./TempUserFiles/${fileName}.js`
  )
  return result
}

//process JSX code coming in from client
const processUserJSXCode = async (fileName, code) => {
  const codeForBabel = `${code}; ReactDOM.render(<App />, document.querySelector('#app'))`
  const userFilesDir = path.join(__dirname, '..', '..', 'TempUserFiles')
  const htmlFileStart = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Document</title>
        <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
        <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
        <body>
        <div id="app"></div>
        <script>`

  const htmlFileEnd = `
                </script>
            </body>
        </html>`

  await writeFilePromise(
    path.join(userFilesDir, `${fileName}.js`),
    codeForBabel
  )
  const transpiledCode = await babelTransformPromise(
    codeForBabel,
    path.join(userFilesDir, `${fileName}.js`)
  )

  const stringToConsole = runTranspiledCode(transpiledCode, fileName)
  await writeFilePromise(
    path.join(userFilesDir, `${fileName}.html`),
    `${htmlFileStart}${transpiledCode}${htmlFileEnd}`
  )
  return { stringToConsole, message: 'html file successfully written' }
}

//process JS code coming in from client
const processUserJSCode = code => {
  let result = ''
  const myConsoleLog = (...args) => {
    result = `${result}${util.format(...args)}\n`
  }
  const alteredCode = code.replace(/console\.log\(/g, 'myConsoleLog')
  eval(alteredCode)
  return result
}

const runUserCode = ({ fileName, code, language }) => {
  if (language === 'jsx') {
    return processUserJSXCode(fileName, code)
  }

  if (language === 'javascript') {
    return processUserJSCode(code)
  }
}

module.exports = runUserCode
