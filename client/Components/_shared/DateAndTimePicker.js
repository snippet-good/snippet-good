import React from 'react'

import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { DateTimePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

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
