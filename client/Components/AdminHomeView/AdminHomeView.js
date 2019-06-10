import React, { useState } from 'react'
import { connect } from 'react-redux'
import { getFilteredStretchesOfAdmin } from './helperfunctions'
import SingleStretchCard from './SingleStretchCard'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import styles from './styles'

const AdminHomeView = ({ openStretches, scheduledStretches, history }) => {
  const [showScheduled, setShowScheduled] = useState(false)

  return (
    <div>
      <Button
        color="primary"
        variant="contained"
        size="small"
        onClick={() => history.push('/admin/stretches/create')}
      >
        Create new stretch
      </Button>
      <Typography variant="subtitle1" style={styles.openStretchesHeading}>
        Your Open Stretches
      </Typography>

      {openStretches.length ? (
        <Grid container style={styles.stretchesGrid}>
          {openStretches.map(stretch => {
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

      <Typography
        variant="subtitle1"
        onClick={() => setShowScheduled(!showScheduled)}
      >
        Open a Scheduled Stretch
      </Typography>
      {showScheduled && !scheduledStretches.length && (
        <Typography variant="body2">
          <i>You have no stretches currently scheduled</i>
        </Typography>
      )}
      {showScheduled && scheduledStretches.length ? (
        <Grid container style={styles.stretchesGrid}>
          {scheduledStretches.map(stretch => {
            console.log(stretch)
            return (
              <Grid item xs={5} key={stretch.id}>
                <SingleStretchCard stretch={stretch} status="scheduled" />
              </Grid>
            )
          })}
        </Grid>
      ) : (
        ''
      )}
    </div>
  )
}

const mapStateToProps = ({
  stretches,
  cohorts,
  cohortStretches,
  userDetails,
  users,
  stretchAnswers
}) => {
  const { open, scheduled } = getFilteredStretchesOfAdmin(
    userDetails.id,
    cohortStretches,
    stretches,
    users,
    stretchAnswers
  )
  return {
    openStretches: open,
    scheduledStretches: scheduled,
    cohorts,
    userId: userDetails.id
  }
}

export default connect(mapStateToProps)(AdminHomeView)
