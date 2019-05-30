import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getCohortsOfAdminThunk } from '../../store/cohorts/actions'
import { getStretchAnswersOfSingleAdminThunk } from '../../store/stretch-answers/actions'
import { getUsersOfSingleAdminThunk } from '../../store/users/actions'
import { getFilteredStretchesOfAdmin } from './helperfunctions'
import ScheduledCohortStretchesList from '../ScheduledCohortStretchesList'
import Sidebar from '../Sidebar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const AdminHomeView = ({
  cohorts,
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
      <h2>Your Home Page</h2>

      <Grid container>
        <Grid item xs={3}>
          <Sidebar cohorts={cohorts} history={history} />
        </Grid>
        <Grid item xs={9}>
          {openStretches.length && (
            <ul>
              {openStretches.map(stretch => {
                const {
                  title,
                  id,
                  minutes,
                  category,
                  cohortName,
                  cohortSize,
                  completedStretches
                } = stretch
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
                      <Typography variant="body2" component="p">
                        {`${completedStretches} out of ${cohortSize} students are done`}
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
        </Grid>
      </Grid>
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
