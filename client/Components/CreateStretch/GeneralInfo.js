import React, { useState } from 'react'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'

import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { DateTimePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

// Notes:
// - Input fields in stretch details section is vertically misaligned
// - Prep this view accept information for updating a stretch

const GeneralInfo = props => {
  const { categories, stretches, stretchAnswers } = props // Redux state
  const { title, category, scheduledDate } = props // Local state
  const { handleChange } = props // Event handlers from View component

  if (!categories) return null

  // This state handled the opening/closing of the stretch details ExpansionPanel.
  const [infoIsOpen, setInfoIsOpen] = useState(false)
  const handleInfoClick = () => setInfoIsOpen(!infoIsOpen)

  // This function is handle the Material UI's DateTimePicker component.
  // The component does not emit a standard event. It only emits the selected date.
  const handleTimeChange = date =>
    handleChange({ target: { name: 'scheduledDate', value: date } })

  return (
    <div style={styles.root}>
      <ExpansionPanel
        style={styles.info}
        expanded={infoIsOpen}
        onChange={handleInfoClick}
      >
        {infoIsOpen ? (
          // Renders when ExpansionPanel is open

          <ExpansionPanelSummary>
            <Typography variant="h6">Stretch Details</Typography>
          </ExpansionPanelSummary>
        ) : (
          // Renders when ExpansionPanel is closed

          <ExpansionPanelSummary>
            <Grid container justify="center" alignItems="center" spacing={2}>
              <Grid item xs={4}>
                <InputLabel shrink>Title</InputLabel>
                <Typography variant="subtitle2">{title}</Typography>
              </Grid>

              <Grid item xs={4}>
                <InputLabel shrink>Category</InputLabel>
                <Typography variant="subtitle2">{category}</Typography>
              </Grid>

              <Grid item xs={4}>
                <InputLabel shrink>Scheduled Date</InputLabel>
                <Typography variant="subtitle2">
                  {scheduledDate.toString().slice(0, 10)}
                </Typography>
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
        )}

        {/* The below section is used to fill out details for the new stretch. */}

        <ExpansionPanelDetails>
          <Grid container spacing={2} style={styles.inputContainer}>
            {/* Title input field */}

            <Grid item xs={4} style={styles.box}>
              <TextField
                name="title"
                label="Title"
                defaultValue="Untitled"
                margin="normal"
                onChange={handleChange}
              />
            </Grid>

            {/* Category select field */}

            <Grid item xs={4} style={styles.box}>
              <FormControl style={styles.select}>
                <InputLabel shrink>Category</InputLabel>
                <Select
                  name="category"
                  label="Category"
                  value={category}
                  autoWidth
                  onChange={handleChange}
                >
                  <MenuItem value="None">
                    <em>None</em>
                  </MenuItem>
                  {categories.map(c => (
                    <MenuItem key={c.id} value={c.name}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Date scheduler for stretch */}
            <Grid item xs={4} style={styles.box}>
              <FormControl style={styles.dateSelect}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    name="scheduledDate"
                    value={scheduledDate}
                    disablePast
                    label="Scheduled Date"
                    showTodayButton
                    onChange={handleTimeChange}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              {' '}
            </Grid>
            <Grid item xs={4}>
              {' '}
            </Grid>
            <Grid item xs={4}>
              {' '}
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.5em 0.5em 1.75em',
    borderBottom: '2px solid lightGrey'
  },
  info: {
    width: '98%'
  },
  select: {
    width: '90%',
    marginTop: '3px'
  },
  dateSelect: {
    width: '90%'
  },
  inputContainer: {},
  box: {
    display: 'flex',
    alignItems: 'center'
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
  stretches: state.stretches,
  stretchAnswers: state.stretchAnswers
})

export default connect(mapStateToProps)(GeneralInfo)
