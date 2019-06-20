/* eslint-disable complexity */
import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  openStretchProcessThunk,
  closeStretchProcess
} from '../../store/shared-actions'
import { updateCohortStretch } from '../../store/cohort-stretches/actions'
import { parseDateTime } from '../../utilityfunctions'
import { Link } from 'react-router-dom'

import Timer from '../_shared/Timer'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import moment from 'moment'

const styles = {
  singleCard: {
    marginBottom: '10px'
  }
}

const SingleStretchCard = ({
  stretch,
  status,
  openStretchProcess,
  closeStretchProcess,
  updateCohortStretch,
  userDetails,
  cohortStretch
}) => {
  const {
    title,
    minutes,
    category,
    categoryName,
    cohortName,
    cohortSize,
    completedStretches,
    scheduledDate,
    startTimer,
    stretchId,
    cohortStretchId
  } = stretch

  let initialTotalSecondsLeft =
    minutes * 60 -
    moment
      .utc(new Date())
      .local()
      .diff(moment.utc(startTimer).local(), 'seconds')

  const [totalSecondsLeft, setTotalSecondsLeft] = useState(
    initialTotalSecondsLeft || 1
  )

  return (
    <Card style={styles.singleCard}>
      <CardContent>
        <Typography variant="subtitle2" color="primary">
          <Link
            to={
              userDetails.isAdmin
                ? `/admin/singleStretch/${stretchId}`
                : `/student/stretch/${cohortStretchId}`
            }
          >
            {title}
          </Link>
        </Typography>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" component="p">
              <i>Cohort:</i> {cohortName}
            </Typography>

            <Typography variant="body2" component="p">
              <i>Category: </i>
              {userDetails.isAdmin ? category : categoryName}
            </Typography>
            {status === 'scheduled' && (
              <Typography variant="body2" component="p">
                {parseDateTime(scheduledDate)}
              </Typography>
            )}
          </Grid>

          {status === 'open' && (
            <Grid item xs={12} md={6}>
              <Timer
                minutesForStretch={minutes}
                timeStretchStarted={startTimer}
                action={
                  userDetails.isAdmin
                    ? closeStretchProcess
                    : updateCohortStretch
                }
                args={
                  userDetails.isAdmin
                    ? [cohortStretchId]
                    : [cohortStretch.id, { ...cohortStretch, status: 'closed' }]
                }
                {...{ totalSecondsLeft, setTotalSecondsLeft }}
              />
              {userDetails.isAdmin && (
                <Typography variant="body2" component="p">
                  {`${completedStretches} out of ${cohortSize} students are done`}
                </Typography>
              )}
            </Grid>
          )}

          {status === 'scheduled' && userDetails.isAdmin && (
            <Grid item xs={12} md={6}>
              <CardActions>
                <Button
                  color="primary"
                  onClick={() =>
                    openStretchProcess(stretch, stretch.id, {
                      status: 'open',
                      startTimer: new Date()
                    })
                  }
                >
                  Open stretch
                </Button>
              </CardActions>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  )
}

const mapStateToProps = (
  { userDetails, cohortStretches },
  { stretch: { cohortStretchId } }
) => ({
  userDetails,
  cohortStretch: cohortStretches.find(cs => cs.id === cohortStretchId)
})

const mapDispatchToProps = dispatch => {
  return {
    openStretchProcess: (stretch, cohortStretchId, updatedFields) =>
      dispatch(
        openStretchProcessThunk(stretch, cohortStretchId, updatedFields)
      ),
    closeStretchProcess: cohortStretchId =>
      dispatch(closeStretchProcess(cohortStretchId)),
    updateCohortStretch: (id, cohortStretch) =>
      dispatch(updateCohortStretch(id, cohortStretch))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleStretchCard)
