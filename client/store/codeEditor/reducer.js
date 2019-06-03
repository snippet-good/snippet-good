import { RUN_CODE_RESULT } from './actions'

export default (state = '', action) => {
  switch (action.type) {
    case RUN_CODE_RESULT:
      return action.codeResult

    default:
      return state
  }
}
