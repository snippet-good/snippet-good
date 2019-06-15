const code = `const React = require('react')
const ReactDom=require('react-dom')

const App = () => {
  console.log('hi')
  return <div>{rt}</div>
}

ReactDOM.render(<App />, document.querySelector('#app'))

`
let ty
require('@babel/core').transform(
  code,
  { filename: 'testBabelJSX.js' },
  (err, result) => {
    if (err) console.log(err.message)
    console.log(result.code)
    // eval(result.code)
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
