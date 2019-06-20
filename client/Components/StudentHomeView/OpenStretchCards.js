import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import SingleStretchCard from '../_shared/SingleStretchCard'

const styles = {
  stretchesGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '30px',
    marginTop: '5px'
  },
  openStretchesHeading: {
    marginTop: '10px'
  }
}

const OpenStretchCards = ({ stretches }) => {
  return (
    <div>
      {' '}
      <Typography variant="subtitle1" style={styles.openStretchesHeading}>
        Your Open Stretches
      </Typography>
      {stretches.length ? (
        <Grid container style={styles.stretchesGrid}>
          {stretches.map(stretch => {
            return (
              <Grid item xs={5} key={stretch.id}>
                <SingleStretchCard stretch={stretch} status="open" />
              </Grid>
            )
          })}
        </Grid>
      ) : (
        <Typography variant="body2">
          <i>You have no stretches currently open</i>
        </Typography>
      )}
    </div>
  )
}

export default OpenStretchCards
