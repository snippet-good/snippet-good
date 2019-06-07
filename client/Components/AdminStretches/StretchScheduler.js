import React, { useState } from 'react'

import { connect } from 'react-redux'
import { createCohortStretch } from '../../store/cohort-stretches/actions'

import Grid from '@material-ui/core/Grid'
import Modal from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import DateAndTimePicker from '../_shared/DateAndTimePicker'

const StretchScheduler = props => {
  const { attributes, open, onClose } = props
  const { id } = attributes

  const [scheduledDate, setScheduledDate] = useState(new Date())

  const handleSubmit = event => {
    event.preventDefault()

    props
      .scheduleStretch({
        status: 'scheduled',
        scheduledDate,
        minutes: 5,
        allowAnswersToBeRun: false,
        stretchId: id
      })
      .then(() => {
        onClose() // Close modal
        // Maybe display a message saying 'Stretch scheduled successfully!'
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
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={12} style={styles.center}>
              <DateAndTimePicker
                name="scheduledDate"
                label="Scheduled Date"
                value={scheduledDate}
                handleChange={setScheduledDate}
              />
            </Grid>

            <Grid item xs={12} style={{ height: '20px' }} />

            <Grid item xs={12} style={styles.center}>
              <Button type="submit" variant="contained" color="primary">
                Schedule
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Modal>
  )
}

const styles = {
  root: {
    width: '100vw',
    height: '100vh'
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

const mapStateToProps = ({ cohorts }) => ({ cohorts })

const mapDispatchToProps = dispatch => ({
  scheduleStretch: data => dispatch(createCohortStretch(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StretchScheduler)
