import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'

const TextInputGroup = props => {
  const { name, type, label, margin, fullWidth, errors } = props

  return (
    <TextField
      error={!!errors}
      name={name}
      type={type}
      label={label}
      margin={margin}
      fullWidth={fullWidth}
      helperText={errors ? errors.msg : ''}
    />
  )
}

TextInputGroup.defaultProps = {
  margin: 'normal',
  type: 'text',
  errors: null,
  fullWidth: false
}

export default TextInputGroup
