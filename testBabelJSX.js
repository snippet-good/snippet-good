const { NodeVM, VM } = require('vm2')
const util = require('util')

const vm2 = new VM({
  timeout: 1000,
  sandbox: {}
})
console.log(vm2.run('1337'))
let resultS = ''
const myConsoleLog = (...args) => {
  resultS = `${resultS}${util.format(...args)}\n`
  console.log('my', resultS)
}

const vm = new NodeVM({
  console: 'inherit',
  sandbox: { myConsoleLog },
  require: {
    external: ['react', 'react-dom'],
    import: ['react', 'react-dom']
  }
})

const code = `
const React = require('react')
const ReactDOM =require('react-dom')
const App = () => {
  console.log('hello')
  return <div>hello23</div>
}
App()
`
require('@babel/core').transform(
  code,
  { filename: 'testBabelJSX.js' },
  (err, result) => {
    if (err) console.log(err.message)
    //    console.log(result.code)
    const alteredCode = `${result.code.replace(
      /console\.log/g,
      'myConsoleLog'
    )}`
    //console.log(alteredCode)
    try {
      vm.run(alteredCode, 'testBabelJSX.js')
      console.log('ty', resultS)
    } catch (err2) {
      console.log('HERE', err2)
    }
  }
)

/*const webpack = require('webpack')

const path = require('path')
webpack(
  {
    entry: './testWebpack.js',
    output: {
      path: path.join(__dirname),
      filename: './testWebpac2k.js'
    },
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    }
  },
  (err, stats) => {
    if (err || stats.hasErrors()) {
      console.log(stats.toJson().errors)
    } else {
      console.log('ran successfully')
    }
  }
)*/
