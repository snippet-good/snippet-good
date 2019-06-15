import axios from 'axios'

const runCode = function(code) {
  return axios
    .post('/api/code/runcode', { code })
    .then(res => {
      this.setState({
        codeResponse: String(res.data),
        codeError: ''
      })
    })
    .catch(({ response: { data } }) => {
      this.setState({ codeError: data, codeResponse: '' })
    })
}

const clearCodeResults = function() {
  this.setState({ codeResponse: '', codeError: '' })
}

export default { runCode, clearCodeResults }
