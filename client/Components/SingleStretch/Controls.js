import React, { useState } from 'react'
import Button from '@material-ui/core/Button'

import Modal from '@material-ui/core/Modal'

import { ControlStyles as styles } from './styles'

const Controls = props => {
  const { mode, changeMode } = props

  const setModeToUpdate = () => changeMode('update')

  return (
    <div style={styles.root}>
      {/* This is the update button. This button will only show in 'read' mode. */}
      {mode === 'read' && (
        <Button
          variant="contained"
          style={{ ...styles.updateButton }}
          onClick={setModeToUpdate}
        >
          Update
        </Button>
      )}

      {/* This button is the submit button for the update and create form.*/}
      {mode !== 'read' && (
        <Button type="submit" variant="contained" color="primary">
          {mode === 'update' ? 'Save changes' : 'Submit'}
        </Button>
      )}
    </div>
  )
}

export default Controls
