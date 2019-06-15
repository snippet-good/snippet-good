import axios from 'axios'

const runCode = function(postPayload) {
  this.setState({ fileGenerated: false }, function() {
    return axios
      .post('/api/code/runcode', postPayload)
      .then(res => {
        const stateObject =
          postPayload.language === 'javascript'
            ? {
                codeResponse: String(res.data),
                codeError: ''
              }
            : { fileGenerated: res.data === 'html file successfully written' }
        this.setState(stateObject, () => console.log(this.state))
      })
      .catch(({ response: { data } }) => {
        this.setState({ codeError: data, codeResponse: '' }, () =>
          console.log('after error', this.state)
        )
      })
  })
}

const clearCodeResults = function() {
  this.setState({ codeResponse: '', codeError: '', fileGenerated: false })
}

export default { runCode, clearCodeResults }
