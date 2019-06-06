import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import StretchListView from './StretchListView'

const checkIfAllDataExists = (...args) => {
  for (let i = 0; i < args.length; ++i) {
    if (Array.isArray(args[i])) {
      if (!args[i].length) return false
    } else if (!args[i].id) {
      return false
    }
  }
  return true
}

const mapStateToProps = ({
  userDetails,
  cohorts,
  cohortUsers,
  stretches,
  cohortStretches,
  stretchAnswers
}) => {
  if (
    !checkIfAllDataExists(
      userDetails,
      cohorts,
      cohortUsers,
      stretches,
      cohortStretches,
      stretchAnswers
    )
  )
    return {}
  const student = userDetails
  const myCohortUser = cohortUsers.find(
    cohortUser => cohortUser.userId === student.id
  )
  const myCohort = cohorts.reduce((acc, cohort) => {
    for (let i = 0; i < cohortUsers.length; ++i) {
      if (
        cohortUsers[i].userId === student.id &&
        cohortUsers[i].cohortId === cohort.id
      ) {
        acc.push(cohort)
      }
    }
    return acc
  }, [])
  const myStretches = stretches.reduce(
    (acc, stretch) => {
      for (let i = 0; i < cohortStretches.length; ++i) {
        if (
          cohortStretches[i].stretchId === stretch.id &&
          cohortStretches[i].cohortId === myCohort[0].id
        ) {
          if (cohortStretches[i].status === 'open') {
            acc.openStretches.push(stretch)
          } else {
            const myStretchAnswer = stretchAnswers.find(
              stretchAnswer =>
                stretchAnswer.cohortuserId === myCohortUser.id &&
                stretchAnswer.stretchId === stretch.id
            )
            if (myStretchAnswer) {
              myStretchAnswer.title = stretch.title
              acc.submittedStretches.push(myStretchAnswer)
            }
          }
        }
      }
      return acc
    },
    { openStretches: [], submittedStretches: [] }
  )
  const { openStretches, submittedStretches } = myStretches
  return {
    openStretches,
    submittedStretches
  }
}

const StudentHomeView = ({
  openStretches,
  submittedStretches,
  match: {
    params: { status }
  }
}) => {
  if (!openStretches) return <div>You have no open or submitted stretches</div>

  const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3)
    }
  }))

  const classes = useStyles()

  return (
    <main className={classes.content}>
      {status === 'open' ? (
        <StretchListView openStretches={openStretches} />
      ) : status === 'submitted' ? (
        <StretchListView submittedStretches={submittedStretches} />
      ) : (
        <Redirect to="/student/stretches/submitted" />
      )}
    </main>
  )
}

export default connect(mapStateToProps)(StudentHomeView)
