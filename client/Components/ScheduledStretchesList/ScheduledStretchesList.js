import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const ScheduledStretchesList = ({ scheduledStretches }) => {
  return (
    <ul>
      {scheduledStretches.map(stretch => {
        const { id, title, category, difficulty } = stretch
        return (
          <Card key={stretch.id}>
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
                <Button color="primary">Open stretch</Button>
              </CardActions>
            </CardContent>
          </Card>
        )
      })}
    </ul>
  )
}

export default ScheduledStretchesList
