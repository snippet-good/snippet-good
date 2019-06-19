import React from 'react'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'

import { ControlStyles as styles } from './styles'

const Controls = props => {
  const { mode, changeMode, authorId, userDetails } = props

  const setModeToUpdate = () => changeMode('update')

  return (
    <div style={styles.root}>
      {/* This is the update button. This button will only show in 'read' mode. */}
      {mode === 'read' && (
        <Button
          variant="contained"
          style={{ ...styles.updateButton }}
          onClick={setModeToUpdate}
          disabled={authorId !== userDetails.id}
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

      {mode === 'update' && (
        <Button
          type="button"
          variant="contained"
          color="secondary"
          onClick={() => changeMode('read')}
          style={styles.button}
        >
          Discard Changes
        </Button>
      )}
    </div>
  )
}

const mapStateToProps = ({ userDetails }) => ({ userDetails })

export default connect(mapStateToProps)(Controls)
