import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCohortsOfAdminThunk } from '../../store/cohorts/actions'
import { getFilteredStretchesOfAdmin } from './helperfunctions'
import ScheduledCohortStretchesList from '../ScheduledCohortStretchesList'
import Sidebar from '../Sidebar'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const AdminHomeView = ({
  cohorts,
  userId,
  getCohortsOfAdmin,
  openStretches,
  scheduledStretches,
  history
}) => {
  useEffect(() => {
    if (userId) {
      getCohortsOfAdmin(userId)
    }
  }, [userId])
  const [showScheduled, setShowScheduled] = useState(false)

  return (
    <div>
      <h2>Your Home Page</h2>
      <Sidebar cohorts={cohorts} history={history} />
      {openStretches.length && (
        <ul>
          {openStretches.map(stretch => {
            const { title, id, minutes, category, cohortName } = stretch
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
                    {cohortName}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                  >{`${minutes}:00`}</Typography>
                  <Typography variant="body2" component="p">
                    {category}
                  </Typography>
                </CardContent>
              </Card>
            )
          })}
        </ul>
      )}

      <Button onClick={() => setShowScheduled(!showScheduled)}>
        Open scheduled stretch
      </Button>
      {showScheduled && (
        <ScheduledCohortStretchesList
          scheduledCohortStretches={scheduledStretches}
        />
      )}
      <Button onClick={() => history.push('/createstretch')}>
        Add new stretch
      </Button>
    </div>
  )
}

const mapStateToProps = ({
  stretches,
  cohorts,
  cohortStretches,
  userDetails
}) => {
  const { open, scheduled } = getFilteredStretchesOfAdmin(
    userDetails.id,
    cohortStretches,
    stretches
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
    getCohortsOfAdmin: adminId => dispatch(getCohortsOfAdminThunk(adminId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminHomeView)
