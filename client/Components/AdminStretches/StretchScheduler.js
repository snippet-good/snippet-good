import React, { useState } from 'react'

import { connect } from 'react-redux'
import { createCohortStretch } from '../../store/cohort-stretches/actions'

import Grid from '@material-ui/core/Grid'
import Modal from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import DateAndTimePicker from '../_shared/DateAndTimePicker'
import CohortSelect from '../_shared/CohortSelect'

const StretchScheduler = props => {
  const { attributes, open, onClose } = props
  const { id } = attributes

  const [scheduledDate, setScheduledDate] = useState(new Date())
  const [selectedCohortId, setSelectedCohortId] = useState('')

  const handleCohortIdChange = event => setSelectedCohortId(event.target.value)

  const handleSubmit = event => {
    event.preventDefault()

    props
      .scheduleStretch({
        status: 'scheduled',
        scheduledDate,
        minutes: 5,
        allowAnswersToBeRun: false,
        stretchId: id,
        cohortId: selectedCohortId
      })
      .then(() => {
        onClose() // Close modal
        console.log()
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
        <form onSubmit={handleSubmit}>
          <Grid container>
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

            <Grid item xs={12}>
              <CohortSelect
                cohortId={selectedCohortId}
                handleChange={handleCohortIdChange}
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
