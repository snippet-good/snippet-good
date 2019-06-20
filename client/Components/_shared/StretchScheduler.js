import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  createCohortStretch,
  updateCohortStretchThunk
} from '../../store/cohort-stretches/actions'

import Grid from '@material-ui/core/Grid'
import Modal from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'

import DateAndTimePicker from './DateAndTimePicker'
import CohortSelect from './CohortSelect'

const StretchScheduler = props => {
  const { attributes, open, onClose, mode, type } = props
  const { id } = attributes

  const [scheduledDate, setScheduledDate] = useState(new Date())
  const [selectedCohortId, setSelectedCohortId] = useState('')
  const [allowAnswersToBeRun, setAllowAnswersToBeRun] = useState(false)
  const [displayType, setDisplayType] = useState(type)

  const handleCohortIdChange = event => setSelectedCohortId(event.target.value)

  const updateData = () => {
    if (mode === 'update') {
      return props.updateScheduledDate(id, { scheduledDate })
    } else {
      return props
        .scheduleStretch({
          status: 'scheduled',
          scheduledDate,
          allowAnswersToBeRun,
          stretchId: id,
          cohortId: selectedCohortId
        })
        .then(() => props.history.push(`/admin/cohort/${selectedCohortId}`))
    }
  }

  const handleSubmit = event => {
    event.preventDefault()

    updateData().then(() => {
      onClose() // Close modal
      // Display a message saying 'Stretch scheduled successfully!'
    })
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{ ...styles.root, ...styles.center }}
      disableAutoFocus={true}
    >
      <Paper style={{ padding: '2em' }}>
        {displayType === 'question' && (
          <Typography variant="body1">
            Would you like to also schedule this stretch?
            <Button color="primary" onClick={() => setDisplayType('scheduler')}>
              Yes
            </Button>
            <Button color="secondary" onClick={onClose}>
              No
            </Button>
          </Typography>
        )}

        {displayType !== 'question' && (
          <form onSubmit={handleSubmit}>
            <Grid container>
              {mode === 'create' && (
                <Grid
                  item
                  xs={12}
                  style={{ ...styles.center, ...styles.warning }}
                >
                  <Typography variant="caption">
                    * any cohorts in red are ones you have already used stretch
                    in
                  </Typography>
                </Grid>
              )}

              {/* Date and time picker for scheduling the stretch */}
              <Grid item xs={12} style={styles.center}>
                <DateAndTimePicker
                  name="scheduledDate"
                  label="Scheduled Date"
                  value={scheduledDate}
                  handleChange={setScheduledDate}
                />
              </Grid>

              <Grid item xs={12} style={{ height: '20px' }} />
              {mode === 'create' && (
                <Grid item xs={12}>
                  <CohortSelect
                    cohortId={selectedCohortId}
                    handleChange={handleCohortIdChange}
                    stretchId={id}
                  />
                </Grid>
              )}

              <Grid item xs={12} style={{ height: '20px' }} />
              {mode === 'create' && (
                <Grid item xs={12} style={styles.center}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={allowAnswersToBeRun}
                        onChange={({ target }) =>
                          setAllowAnswersToBeRun(target.checked)
                        }
                        color="primary"
                      />
                    }
                    label="Check this box if you want to allow students to run code while completing the stretch"
                  />
                </Grid>
              )}

              <Grid item xs={12} style={{ height: '20px' }} />
              <Grid item xs={12} style={styles.center}>
                <Button type="submit" variant="contained" color="primary">
                  Schedule
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Paper>
    </Modal>
  )
}

const styles = {
  root: {
    width: '70%',
    height: '100vh',
    margin: '0 auto'
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  warning: {
    color: 'red',
    marginBottom: '15px'
  }
}

const mapStateToProps = ({ cohorts }, { history }) => ({ cohorts, history })

const mapDispatchToProps = dispatch => ({
  scheduleStretch: data => dispatch(createCohortStretch(data)),
  updateScheduledDate: (cohortStretchId, updatedFields) =>
    dispatch(updateCohortStretchThunk(cohortStretchId, updatedFields))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(StretchScheduler))
