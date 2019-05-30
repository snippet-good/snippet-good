import React from 'react'
import Button from '@material-ui/core/Button'

const Controls = props => {
  return (
    <div style={styles.root}>
      <Button variant="outlined">Existing Stretches</Button>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </div>
  )
}

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1em',
    borderBottom: '2px solid lightGrey'
  }
}

export default Controls
