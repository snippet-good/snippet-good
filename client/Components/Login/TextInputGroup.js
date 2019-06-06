import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'

const TextInputGroup = props => {
  const { style, name, type, label, margin, fullWidth, errors } = props

  return (
    <TextField
      error={!!Object.keys(errors).length}
      name={name}
      type={type}
      label={label}
      margin={margin}
      fullWidth={fullWidth}
      helperText={errors ? errors.msg : ''}
      style={style}
    />
  )
}

TextInputGroup.defaultProps = {
  style: {},
  margin: 'normal',
  type: 'text',
  errors: {},
  fullWidth: false
}

export default TextInputGroup
