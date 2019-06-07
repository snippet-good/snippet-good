import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { CodeEditor } from '../../Components/index'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { createStretchAnswerThunk } from '../../store/stretch-answers/actions'

const checkIfAllDataExists = (cohortUsers, stretches, cohortStretches) => {
  const data = [cohortUsers, stretches, cohortStretches]
  for (let i = 0; i < data.length; ++i) {
    if (!data[i].length) {
      return false
    }
  }
  return true
}

const mapDispatchToProps = dispatch => {
  return {
    createStretchAnswer: stretchAnswer =>
      dispatch(createStretchAnswerThunk(stretchAnswer))
  }
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

const OpenStretchView = ({
  myStretch,
  myCohortStretch,
  createStretchAnswer
}) => {
  const classes = useStyles()
  const [codePrompt, setCodePrompt] = useState('')
  const [remainingTime, setRemainingTime] = useState(0)
  const [displayMinutes, setDisplayMinutes] = useState(0)
  const [displaySeconds, setDisplaySeconds] = useState(59)
  const [stretchAnswer, setStretchAnswer] = useState('')
  useEffect(() => {
    if (myStretch) {
      setCodePrompt(myStretch.codePrompt)
    }
    if (myCohortStretch && !remainingTime) {
      setDisplayMinutes(myCohortStretch.minutes - 1)
      setRemainingTime(myCohortStretch.minutes * 60)
    }
    if (myCohortStretch && remainingTime) {
      const timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1)
        if (displaySeconds > 0) {
          setDisplaySeconds(displaySeconds - 1)
        } else {
          setDisplaySeconds(59)
          setDisplayMinutes(displayMinutes - 1)
        }
      }, 1000)
      if (remainingTime === 1) {
        clearTimeout(timer)
        createStretchAnswer({
          body: stretchAnswer,
          timeToSolve: myCohortStretch.minutes * 60 - remainingTime
        })
      }
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
        <Paper>
          <Typography variant="h3" component="h3">
            Time Remaining: {displayMinutes}:{' '}
            {displaySeconds < 10 ? `0${displaySeconds}` : `${displaySeconds}`}
          </Typography>
        </Paper>
      </Paper>
      <CodeEditor code={codePrompt} setStretchAnswer={setStretchAnswer} />
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenStretchView)
