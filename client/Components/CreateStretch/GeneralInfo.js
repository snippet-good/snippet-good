import React, { useState } from 'react'

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

// Issues:
// - Vertical misalignment from input fields in stretch details sections

const GeneralInfo = props => {
  const { categories } = props
  if (!categories) return null
  // This state handles the opening/closing for the StretchDetails ExpansionPanel.
  const [infoIsOpen, setInfoIsOpen] = useState(false)
  const handleInfoClick = () => setInfoIsOpen(!infoIsOpen)

  // This state handles the category display on the select input.
  const [selectedCategory, setSelectedCategory] = useState('')
  const handleCategoryChange = event => setSelectedCategory(event.target.value)

  const [selectedDate, setSelectedDate] = useState(new Date())
  const handleDateChange = date => setSelectedDate(date)

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
                <Typography variant="subtitle2">Untitled</Typography>
              </Grid>
              <Grid item xs={4}>
                <InputLabel shrink>Category</InputLabel>
                <Typography variant="subtitle2">
                  {selectedCategory ? selectedCategory : 'No category'}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <InputLabel shrink>Scheduled Date</InputLabel>
                <Typography variant="subtitle2">
                  {selectedDate.toString().slice(0, 10)}
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
                label="Title"
                defaultValue="Untitled"
                margin="normal"
              />
            </Grid>

            {/* Category select field */}

            <Grid item xs={4} style={styles.box}>
              <FormControl style={styles.select}>
                <InputLabel shrink>Category</InputLabel>
                <Select
                  label="Category"
                  value={selectedCategory}
                  autoWidth
                  onChange={handleCategoryChange}
                >
                  <MenuItem value="">
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
                    value={selectedDate}
                    disablePast
                    onChange={handleDateChange}
                    label="Scheduled Date"
                    showTodayButton
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
    padding: '0.5em'
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

export default GeneralInfo
