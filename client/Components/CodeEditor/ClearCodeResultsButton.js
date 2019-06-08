import React from 'react'
import Button from '@material-ui/core/Button'

const ClearCodeResultsButton = props => {
  const { variant, size, color, clearCodeResults } = props
  return (
    <Button
      variant={variant || 'text'}
      size={size || 'small'}
      color={color}
      type="button"
      onClick={clearCodeResults}
    >
      Clear Results
    </Button>
  )
}

export default ClearCodeResultsButton
