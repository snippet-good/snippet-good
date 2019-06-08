import React from 'react'

import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { DateTimePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

// This is Material UI's date and time picker.

// This component accepts the following props:

// @param {string}         props.name            - The input name
// @param {object, string} props.value           - The date to be displayed
// @param {string}         props.label           - This is the display label on the input

// @param {function}       props.handleChange    -
//      This is used to change the state on the top-level component.

// @param {boolean}        props.showTodayButton -
//      If true, the modal will have a Today button, which sets the value to the current date.

// @param {boolean}        props.disablePast     -
//      If true, the user cannot select any dates before current time.

const DateAndTimePicker = props => {
  const { name, value, label } = props
  const { showTodayButton, disablePast } = props
  const { handleChange } = props

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker
        name={name}
        value={value}
        label={label}
        onChange={handleChange}
        showTodayButton={showTodayButton}
        disablePast={disablePast}
      />
    </MuiPickersUtilsProvider>
  )
}

DateAndTimePicker.defaultProps = {
  name: 'dateTimePicker',
  label: 'Date Time Picker',
  value: new Date(),
  disablePast: true,
  showTodayButton: true,
  handleChange: event => console.log(event.target)
}

export default DateAndTimePicker
