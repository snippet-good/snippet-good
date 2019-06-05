import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { CodeEditor } from '../../Components/index'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Timer from '../Timer/Timer'

const checkIfAllDataExists = (cohortUsers, stretches, cohortStretches) => {
  const data = [cohortUsers, stretches, cohortStretches]
  for (let i = 0; i < data.length; ++i) {
    if (!data[i].length) {
      return false
    }
  }
  return true
}
const mapStateToProps = (
  { userDetails, cohortUsers, stretches, cohortStretches },
  { match }
) => {
  if (checkIfAllDataExists(cohortUsers, stretches, cohortStretches)) {
    const { stretchId } = match.params
    const myCohort = cohortUsers.find(
      cohortUser => cohortUser.userId === userDetails.id
    )
    const myStretch = stretches.find(stretch => stretch.id === stretchId)
    const myCohortStretch = cohortStretches.find(
      cohortStretch =>
        cohortStretch.stretchId === stretchId &&
        cohortStretch.cohortId === myCohort.cohortId &&
        cohortStretch.status === 'open'
    )
    return {
      myStretch,
      myCohortStretch
    }
  }
  return {}
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}))

const OpenStretchView = ({ myStretch, myCohortStretch }) => {
  const classes = useStyles()
  const [codePrompt, setCodePrompt] = useState('')
  const [minutes, setMinutes] = useState(0)
  useEffect(() => {
    if (myStretch !== undefined) {
      setCodePrompt(myStretch.codePrompt)
    }
    if (myCohortStretch !== undefined) {
      setMinutes(myCohortStretch.minutes)
    }
  })
  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          {myStretch === undefined ? 'loading...' : `${myStretch.title}`}
        </Typography>
        <Typography component="p">
          {myStretch === undefined ? 'loading...' : `${myStretch.textPrompt}`}
        </Typography>
      </Paper>
      <CodeEditor codePrompt={codePrompt} />
      <Timer minutes={minutes} />
    </div>
  )
}

export default connect(mapStateToProps)(OpenStretchView)
