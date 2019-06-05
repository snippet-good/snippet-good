import axios from 'axios'

export const RUN_CODE_RESULT = 'RUN_CODE_RESULT'

const runCodeResult = codeResult => ({
  type: RUN_CODE_RESULT,
  codeResult
})

export const runCodeResultThunk = code => {
  return axios.post('/api/code/runcode', { code })
}
