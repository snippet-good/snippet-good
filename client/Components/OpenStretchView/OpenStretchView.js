/* eslint-disable complexity */

// React imports
import React, { useState, useEffect } from 'react'

// Redux imports
import { connect } from 'react-redux'
import { createStretchAnswerThunk } from '../../store/stretch-answers/actions'
import { updateCohortStretch } from '../../store/cohort-stretches/actions'

// Subcomponent imports
import CodeSectionNoRun from './CodeSectionNoRun'
import CodeSectionRun from './CodeSectionRun'
import ConfirmDialogBox from '../_shared/ConfirmDialogBox'
import Timer from '../_shared/Timer'

// Material-UI imports
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

// Utility imports
import { checkIfAllDataExists } from '../../utilityfunctions'
import moment from 'moment'

// ----------------------------------------------------------------------
// Redux dispatches

const mapDispatchToProps = dispatch => ({
  /**
   * Dispatches the return of a Redux thunk for creating new `StretchAnswer` and `Attendance` instances for specified user and cohort. If successful, the funcion proceeds to update the `CohortStretch` instance's `status` field to `closed`.
   * @param {Object} answer
   * @param {Object} attendance
   * @param {Object} cohortStretch
   */
  createStretchAnswer: (answer, attendance, cohortStretch) => {
    return dispatch(
      createStretchAnswerThunk(answer, attendance, cohortStretch.adminIds)
    ).then(() => dispatch(updateCohortStretch({ status: 'closed' })))
  }
})

// ----------------------------------------------------------------------
// Maps Redux state to props

const mapStateToProps = (state, ownProps) => {
  const { userDetails, stretches, cohortStretches } = state
  const cohortStretchId = ownProps.match.params.cohortStretchId

  const result = { userDetails }

  if (checkIfAllDataExists(stretches, cohortStretches)) {
    const myCohortStretch = cohortStretches.find(
      cs => cs.id === cohortStretchId
    )

    result.myStretch = stretches.find(s => s.id === myCohortStretch.stretchId)
    result.myCohortStretch = myCohortStretch
  }

  return result
}

// ----------------------------------------------------------------------
// Material-UI styles

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}))

// ----------------------------------------------------------------------
// OpenStretchView component

const OpenStretchView = props => {
  const { myStretch, myCohortStretch, createStretchAnswer } = props
  const { history, userDetails } = props

  const classes = useStyles()

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

  let [modalOpen, setModalOpen] = useState(false)
  const [codePrompt, setCodePrompt] = useState('')
  const [stretchAnswer, setStretchAnswer] = useState('')

  const submitStretch = (stretchAnswer, myStretch, userDetails, history) => {
    return createStretchAnswer(
      // New stretch answer
      {
        body: stretchAnswer,
        timeToSolve: myStretch.minutes * 60 - totalSecondsLeft,
        cohortstretchId: myCohortStretch.id,
        userId: userDetails.id,
        submittedOnTime: answeringWhenStretchOpen
      },
      // New attendance record
      {
        userId: userDetails.id,
        startDate: myCohortStretch.startTimer,
        cohortId: myCohortStretch.cohortId
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
