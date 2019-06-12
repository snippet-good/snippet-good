import React from 'react'
import { connect } from 'react-redux'
import { updateCohortStretchThunk } from '../../store/cohort-stretches/actions'
import { parseDateTime } from './helperfunctions'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import styles from './styles'

const SingleStretchCard = ({ stretch, status, updateCohortStretch }) => {
  const {
    title,
    minutes,
    category,
    cohortName,
    cohortSize,
    completedStretches,
    scheduledDate
  } = stretch
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
              <Typography
                variant="body2"
                component="p"
              >{`${minutes}:00`}</Typography>
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
                    updateCohortStretch(stretch.id, { status: 'open' })
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
      dispatch(updateCohortStretchThunk(id, updatedFields, updatedEntireItem))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SingleStretchCard)
