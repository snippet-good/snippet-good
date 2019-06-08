//import { runCodeResultThunk } from '../../store/codeEditor/actions'
import axios from 'axios'

export const runCode = code => {
  return axios
    .post('/api/code/runcode', code)
    .then(({ data }) => {
      this.setState({
        codeResponse: String(data),
        codeError: ''
      })
    })
    .catch(({ response: { data } }) => {
      this.setState({ codeError: data, codeResponse: '' })
    })
}

export const clearCodeResults = () => {
  this.setState({ codeResponse: '', codeError: '' })
}
