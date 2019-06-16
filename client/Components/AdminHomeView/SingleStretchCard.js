import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  updateCohortStretchThunk,
  openStretchProcessThunk
} from '../../store/cohort-stretches/actions'
import { parseDateTime } from './helperfunctions'
import Timer from '../_shared/Timer'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import styles from './styles'
import moment from 'moment'

const SingleStretchCard = ({
  stretch,
  status,
  updateCohortStretch,
  openStretchProcess
}) => {
  const {
    title,
    minutes,
    category,
    cohortName,
    cohortSize,
    completedStretches,
    scheduledDate,
    startTimer
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
          {title}
        </Typography>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="body2" component="p">
              <i>Cohort:</i> {cohortName}
            </Typography>

            <Typography variant="body2" component="p">
              <i>Category: </i>
              {category}
            </Typography>
            {status === 'scheduled' && (
              <Typography variant="body2" component="p">
                {parseDateTime(scheduledDate)}
              </Typography>
            )}
          </Grid>

          {status === 'open' && (
            <Grid item xs={6}>
              <Timer
                minutesForStretch={minutes}
                timeStretchStarted={startTimer}
                {...{ totalSecondsLeft, setTotalSecondsLeft }}
              />
              <Typography variant="body2" component="p">
                {`${completedStretches} out of ${cohortSize} students are done`}
              </Typography>
            </Grid>
          )}

          {status === 'scheduled' && (
            <Grid item xs={6}>
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

const mapDispatchToProps = dispatch => {
  return {
    updateCohortStretch: (id, updatedFields, updatedEntireItem) =>
      dispatch(updateCohortStretchThunk(id, updatedFields, updatedEntireItem)),
    openStretchProcess: (stretch, cohortStretchId, updatedFields) =>
      dispatch(openStretchProcessThunk(stretch, cohortStretchId, updatedFields))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SingleStretchCard)
