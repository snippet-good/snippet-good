import React from 'react'
import Button from '@material-ui/core/Button'

const ClearCodeResultsButton = props => {
  const { variant, size, color, clearCodeResults } = props
  return (
    <Button
      variant={variant}
      size={size}
      color={color}
      type="button"
      onClick={clearCodeResults}
    />
  )
}

export default ClearCodeResultsButton
