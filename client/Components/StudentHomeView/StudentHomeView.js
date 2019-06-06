import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import StretchListView from './StretchListView'

const checkIfAllDataExists = (...args) => {
  for (let i = 0; i < args.length; ++i) {
    if (Array.isArray(args[i]) && !args[i].length) return false
    if (!args[i].id) return false
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

const StudentHomeView = ({ openStretches, submittedStretches }) => {
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
  const [stretchesView, setStretchesView] = useState('Submitted Stretches')

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {stretchesView === 'Open Stretches' ? (
        <StretchListView openStretches={openStretches} />
      ) : (
        <StretchListView submittedStretches={submittedStretches} />
      )}
    </main>
  )
}

export default connect(mapStateToProps)(StudentHomeView)
