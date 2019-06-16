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
import ConfirmDialogBox from '../_shared/ConfirmDialogBox'
import moment from 'moment'
import Timer from '../_shared/Timer'

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
  let initialTotalSecondsLeft
  if (myStretch) {
    initialTotalSecondsLeft =
      myStretch.minutes * 60 -
      moment
        .utc(new Date())
        .local()
        .diff(moment.utc(myCohortStretch.startTimer).local(), 'seconds')
  }
  let [totalSecondsLeft, setTotalSecondsLeft] = useState(
    initialTotalSecondsLeft || 1
  )

  const classes = useStyles()
  let [modalOpen, setModalOpen] = useState(false)
  const [codePrompt, setCodePrompt] = useState('')
  const [stretchAnswer, setStretchAnswer] = useState('')

  const handleModalClose = () => {
    history.push('/student')
    setModalOpen(false)
  }

  const submitStretch = (stretchAnswer, myStretch, userDetails, history) => {
    return createStretchAnswer({
      body: stretchAnswer,
      timeToSolve: myStretch.minutes * 60 - totalSecondsLeft,
      cohortstretchId: myCohortStretch.id,
      userId: userDetails.id
    }).then(() => history.push('/student/stretches/submitted'))
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
        setModalClosed={handleModalClose}
        args={[stretchAnswer, myStretch, userDetails, history]}
        action={submitStretch}
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
                {...{ totalSecondsLeft, setTotalSecondsLeft }}
              />
            </Typography>
          )}
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
