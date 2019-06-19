import React from 'react'
import Button from '@material-ui/core/Button'

const RunCodeButton = ({ variant, size, color, runCode, postPayload }) => {
  return (
    <Button
      variant={variant || 'text'}
      size={size || 'small'}
      color={color}
      type="button"
      onClick={() => runCode(postPayload)}
    >
      Run Code
    </Button>
  )
}

export default RunCodeButton
