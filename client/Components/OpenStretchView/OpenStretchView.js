/* eslint-disable complexity */
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
import { joinCohortStretchRoomThunk } from '../../store/socket/actions'
import ConfirmDialogBox from '../_shared/ConfirmDialogBox'
import moment from 'moment'

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
  let secondsLeft
  if (myStretch) {
    secondsLeft =
      myStretch.minutes * 60 -
      moment
        .utc(new Date())
        .local()
        .diff(moment.utc(myCohortStretch.startTimer).local(), 'seconds')
  }

  console.log(secondsLeft)
  const classes = useStyles()
  let [modalOpen, setModalOpen] = useState(false)
  const [codePrompt, setCodePrompt] = useState('')
  const [remainingTime, setRemainingTime] = useState(secondsLeft || 1)
  const [displayMinutes, setDisplayMinutes] = useState(
    Math.floor(secondsLeft / 60) || 0
  )
  const [displaySeconds, setDisplaySeconds] = useState(
    secondsLeft - Math.floor(secondsLeft / 60) * 60 || 0
  )
  const [stretchAnswer, setStretchAnswer] = useState('')

  const handleModalClose = () => {
    setModalOpen(false)
  }

  const submitStretch = (stretchAnswer, myStretch, userDetails, history) => {
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
    let timer
    if (myStretch && secondsLeft) {
      timer = setTimeout(() => {
        secondsLeft =
          myStretch.minutes * 60 -
          moment
            .utc(new Date())
            .local()
            .diff(moment.utc(myCohortStretch.startTimer).local(), 'seconds')
        setRemainingTime(secondsLeft)
        setDisplaySeconds(secondsLeft - Math.floor(secondsLeft / 60) * 60)
        setDisplayMinutes(Math.floor(secondsLeft / 60))
      }, 1000)
    }
    if (remainingTime === 0) {
      clearTimeout(timer)
      setModalOpen(true)
    }
  })
  return (
    <div>
      <ConfirmDialogBox
        text="Confirm to submit"
        open={modalOpen}
        setModalClosed={handleModalClose}
        args={[stretchAnswer, myStretch, userDetails, history]}
        action={submitStretch}
      />
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
