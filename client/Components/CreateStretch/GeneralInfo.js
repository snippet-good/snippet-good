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
import Switch from '@material-ui/core/Switch'
import Slider from '@material-ui/lab/Slider'

import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { DateTimePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import { GeneralInfoStyles as styles } from './styles'

// Notes:
// - Input fields in stretch details section is vertically misaligned
// - Prep this view accept information for updating a stretch

const GeneralInfo = props => {
  const { categories, stretches, stretchAnswers } = props // Redux state
  const { title, categoryId, canBeCoded, difficulty, scheduledDate } = props // Local state
  const { handleChange } = props // Event handlers from View component

  if (!categories) return null

  // This state handled the opening/closing of the stretch details ExpansionPanel.
  const [infoIsOpen, setInfoIsOpen] = useState(false)
  const handleInfoClick = () => setInfoIsOpen(!infoIsOpen)

  // This variable is to handle the display for the category on the collapsed ExpansionPanel.
  const categoryObject = categories.find(c => c.id === categoryId)

  // This function is to handle change from the Material UI's DateTimePicker component.
  // This is because the component does not emit a standard event. It only emits the selected date.
  const handleTimeChange = date =>
    handleChange({ target: { name: 'scheduledDate', value: date } })

  // This function is to handle change from the Material UI's Slider component.
  // This is because the component passes its value as a second parameter to the event handler function.
  const handleDifficultyChange = (event, value) =>
    handleChange({ target: { name: 'difficulty', value } })

  const handleCanBeCodedChange = event =>
    handleChange({ target: { name: 'canBeCoded', value: !canBeCoded } })

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
                <Typography variant="subtitle2">
                  {categoryObject ? categoryObject.name : 'No category'}
                </Typography>
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
                  name="categoryId"
                  label="Category"
                  value={categoryId}
                  autoWidth
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {categories.map(c => (
                    <MenuItem key={c.id} value={c.id}>
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

            <Grid item xs={12} style={{ height: '20px' }} />

            {/* Difficulty slider */}
            <Grid item xs={4}>
              <InputLabel shrink>Difficulty: {difficulty}</InputLabel>
              <br />
              <Slider
                name="difficulty"
                value={difficulty}
                min={1}
                max={5}
                step={1}
                onChange={handleDifficultyChange}
                style={{ width: '80%' }}
              />
            </Grid>

            <Grid item xs={4}>
              {' '}
            </Grid>

            {/* Switch for canBeCoded */}
            <Grid item xs={4}>
              <InputLabel shrink>Can be coded?</InputLabel>
              <br />
              <Switch checked={canBeCoded} onChange={handleCanBeCodedChange} />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}

const mapStateToProps = state => ({
  categories: state.categories,
  stretches: state.stretches,
  stretchAnswers: state.stretchAnswers
})

export default connect(mapStateToProps)(GeneralInfo)
