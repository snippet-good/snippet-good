import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import CodeSectionNoRun from './CodeSectionNoRun'
import CodeSectionRun from './CodeSectionRun'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { createStretchAnswerThunk } from '../../store/stretch-answers/actions'
import { checkIfAllDataExists } from '../../utilityfunctions'

const mapDispatchToProps = dispatch => {
  return {
    createStretchAnswer: stretchAnswer =>
      dispatch(createStretchAnswerThunk(stretchAnswer))
  }
}

const mapStateToProps = (
  { userDetails, stretches, cohortStretches },
  {
    match: {
      params: { cohortStretchId }
    }
  }
) => {
  if (checkIfAllDataExists(stretches, cohortStretches)) {
    const myCohortStretch = cohortStretches.find(
      cs => cs.id === cohortStretchId
    )
    return {
      myStretch: stretches.find(s => s.id === myCohortStretch.stretchId),
      myCohortStretch,
      userDetails
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
  createStretchAnswer,
  userDetails,
  history
}) => {
  const classes = useStyles()
  const [codePrompt, setCodePrompt] = useState('')
  const [remainingTime, setRemainingTime] = useState(0)
  const [displayMinutes, setDisplayMinutes] = useState(0)
  const [displaySeconds, setDisplaySeconds] = useState(59)
  const [stretchAnswer, setStretchAnswer] = useState('')

  const submitStretch = () => {
    return createStretchAnswer({
      body: stretchAnswer,
      timeToSolve: myStretch.minutes * 60 - remainingTime,
      cohortstretchId: myCohortStretch.id,
      userId: userDetails.id
    }).then(() => history.push('/student/stretches/submitted'))
  }
  useEffect(() => {
    if (myStretch) {
      setCodePrompt(myStretch.codePrompt)
      setStretchAnswer(myStretch.codePrompt)
    }
    if (myStretch && !remainingTime) {
      setDisplayMinutes(myStretch.minutes - 1)
      setRemainingTime(myStretch.minutes * 60)
    }
    if (myStretch && remainingTime) {
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
        submitStretch()
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

      {myCohortStretch &&
        (!myCohortStretch.allowAnswersToBeRun ? (
          <CodeSectionNoRun
            codePrompt={codePrompt}
            setStretchAnswer={setStretchAnswer}
          />
        ) : (
          <CodeSectionRun
            codePrompt={codePrompt}
            setStretchAnswer={setStretchAnswer}
            stretchAnswer={stretchAnswer}
          />
        ))}

      <Button onClick={submitStretch}>Submit</Button>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenStretchView)
