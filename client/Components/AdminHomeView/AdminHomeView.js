import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getCohortsOfAdminThunk } from '../../store/cohorts/actions'
import { getStretchAnswersOfSingleAdminThunk } from '../../store/stretch-answers/actions'
import { getUsersOfSingleAdminThunk } from '../../store/users/actions'
import { getFilteredStretchesOfAdmin } from './helperfunctions'
import SingleStretchCard from './SingleStretchCard'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import styles from './styles'

const AdminHomeView = ({
  userId,
  getCohortsOfAdmin,
  getStudentsOfSingleAdmin,
  getStretchAnswersOfSingleAdmin,
  openStretches,
  scheduledStretches,
  history
}) => {
  useEffect(() => {
    if (userId) {
      Promise.all([
        getCohortsOfAdmin(userId),
        getStretchAnswersOfSingleAdmin(userId),
        getStudentsOfSingleAdmin(userId)
      ])
    }
  }, [userId])
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
        <Typography variant="body1">
          You have no stretches currently open
        </Typography>
      )}

      <Typography
        variant="subtitle1"
        onClick={() => setShowScheduled(!showScheduled)}
      >
        Open a Scheduled Stretch
      </Typography>
      {showScheduled && !scheduledStretches.length && (
        <Typography variant="body1">
          You have no stretches currently scheduled
        </Typography>
      )}
      {showScheduled && scheduledStretches.length && (
        <Grid container style={styles.stretchesGrid}>
          {openStretches.map(stretch => {
            console.log(stretch)
            return (
              <Grid item xs={5} key={stretch.id}>
                <SingleStretchCard stretch={stretch} status="scheduled" />
              </Grid>
            )
          })}
        </Grid>
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

const mapDispatchToProps = dispatch => {
  return {
    getCohortsOfAdmin: adminId => dispatch(getCohortsOfAdminThunk(adminId)),
    getStretchAnswersOfSingleAdmin: adminId =>
      dispatch(getStretchAnswersOfSingleAdminThunk(adminId)),
    getStudentsOfSingleAdmin: adminId =>
      dispatch(getUsersOfSingleAdminThunk(adminId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminHomeView)
