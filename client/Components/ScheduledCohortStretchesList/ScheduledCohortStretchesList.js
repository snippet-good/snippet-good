import React from 'react'
import { connect } from 'react-redux'
import { updateCohortStretchThunk } from '../../store/cohort-stretches/actions'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const ScheduledCohortStretchesList = ({
  scheduledCohortStretches,
  updateCohortStretch
}) => {
  return (
    <ul>
      {scheduledCohortStretches.map(cohortStretch => {
        const { id, title, category, difficulty } = cohortStretch
        return (
          <Card key={id}>
            <CardContent>
              <Typography
                component="h3"
                onClick={() => history.push(`/cohortstretch/${id}`)}
              >
                {title}
              </Typography>
              <Typography variant="body2" component="p">
                {category}
              </Typography>
              <Typography variant="body2" component="p">
                {difficulty}
              </Typography>
              <CardActions>
                <Button
                  color="primary"
                  onClick={() =>
                    updateCohortStretch(
                      id,
                      { status: 'open' },
                      { ...cohortStretch, status: 'open' }
                    )
                  }
                >
                  Open stretch
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        )
      })}
    </ul>
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
)(ScheduledCohortStretchesList)
