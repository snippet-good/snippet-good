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
import { updateCohortStretch } from '../../store/cohort-stretches/actions'
import { checkIfAllDataExists } from '../../utilityfunctions'
import ConfirmDialogBox from '../_shared/ConfirmDialogBox'
import moment from 'moment'
import Timer from '../_shared/Timer'

const mapDispatchToProps = dispatch => {
  return {
    createStretchAnswer: (stretchAnswer, cohortStretch) =>
      dispatch(
        createStretchAnswerThunk(stretchAnswer, cohortStretch.adminIds)
      ).then(() =>
        dispatch(
          updateCohortStretch(cohortStretch.id, {
            ...cohortStretch,
            status: 'closed'
          })
        )
      )
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
  let initialTotalSecondsLeft
  let answeringWhenStretchOpen = true
  if (myStretch) {
    initialTotalSecondsLeft =
      myStretch.minutes * 60 -
      moment
        .utc(new Date())
        .local()
        .diff(moment.utc(myCohortStretch.startTimer).local(), 'seconds')
    if (initialTotalSecondsLeft < 0) {
      initialTotalSecondsLeft = myStretch.minutes * 60
      answeringWhenStretchOpen = false
    }
  }

  let [totalSecondsLeft, setTotalSecondsLeft] = useState(
    initialTotalSecondsLeft || 1
  )

  const classes = useStyles()
  let [modalOpen, setModalOpen] = useState(false)
  const [codePrompt, setCodePrompt] = useState('')
  const [stretchAnswer, setStretchAnswer] = useState('')

  const submitStretch = (stretchAnswer, myStretch, userDetails, history) => {
    return createStretchAnswer(
      {
        body: stretchAnswer,
        timeToSolve: myStretch.minutes * 60 - totalSecondsLeft,
        cohortstretchId: myCohortStretch.id,
        userId: userDetails.id,
        submittedOnTime: answeringWhenStretchOpen
      },
      myCohortStretch
    ).then(() => history.push('/student/stretches/submitted'))
  }

  useEffect(() => {
    if (myStretch) {
      setCodePrompt(myStretch.codePrompt)
      setStretchAnswer(myStretch.codePrompt)
    }
  }, [myStretch])

  return (
    <div>
      <ConfirmDialogBox
        text="Confirm to submit"
        open={modalOpen}
        args={[stretchAnswer, myStretch, userDetails, history]}
        action={submitStretch}
        setModalClosed={() => setModalOpen(true)}
        showNoButton={false}
      />
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          {myStretch === undefined ? 'loading...' : `${myStretch.title}`}
        </Typography>
        <Typography component="p">
          {myStretch === undefined ? 'loading...' : `${myStretch.textPrompt}`}
        </Typography>
        <Paper>
          {myStretch && (
            <Typography variant="h3">
              Time Remaining:
              <Timer
                minutesForStretch={myStretch.minutes}
                timeStretchStarted={myCohortStretch.startTimer}
                action={setModalOpen}
                args={[true]}
                {...{
                  totalSecondsLeft,
                  setTotalSecondsLeft,
                  answeringWhenStretchOpen
                }}
              />
            </Typography>
          )}
        </Paper>
      </Paper>

      {myCohortStretch &&
        (!myCohortStretch.allowAnswersToBeRun ? (
          <CodeSectionNoRun
            stretchId={myStretch.id}
            setStretchAnswer={setStretchAnswer}
          />
        ) : (
          <CodeSectionRun
            stretchId={myStretch.id}
            setStretchAnswer={setStretchAnswer}
            stretchAnswer={stretchAnswer}
            cohortStretchId={myCohortStretch.id}
          />
        ))}

      <Button
        onClick={() =>
          submitStretch(stretchAnswer, myStretch, userDetails, history)
        }
      >
        Submit
      </Button>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenStretchView)
