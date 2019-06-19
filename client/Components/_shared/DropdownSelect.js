import React from 'react'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

const DropdownSelect = props => {
  const {
    data,
    currentSelection,
    style,
    valueColumn,
    displayColumn,
    dbName,
    label
  } = props
  const { handleChange } = props

  if (!data) return null

  return (
    <div>
      <InputLabel shrink>{label}</InputLabel>

      <Select
        name={dbName}
        value={currentSelection}
        autoWidth
        style={{ ...style }}
        onChange={handleChange}
      >
        {data.map(item => (
          <MenuItem key={item.id} value={item[valueColumn]}>
            {item[displayColumn]}
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}

DropdownSelect.defaultProps = {
  style: { width: '100%' },
  handleChange: () => {}
}

export default DropdownSelect
