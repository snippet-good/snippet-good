import React from 'react'
import Button from '@material-ui/core/Button'

const RunCodeButton = ({ variant, size, color, runCode, code }) => {
  return (
    <Button
      variant={variant || 'text'}
      size={size || 'small'}
      color={color}
      type="button"
      onClick={() => runCode(code)}
    >
      Run Code
    </Button>
  )
}

export default RunCodeButton
