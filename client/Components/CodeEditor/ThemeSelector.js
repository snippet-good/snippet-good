import React from 'react'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

const ThemeSelector = ({ theme, handleThemeChange }) => {
  return (
    <FormControl>
      <InputLabel shrink htmlFor="editor-theme">
        Editor Theme
      </InputLabel>
      <Select id="editor-theme" value={theme} onChange={handleThemeChange}>
        {['monokai', 'github', 'tomorrow', 'kuroir'].map(el => (
          <MenuItem key={el} value={el}>
            {el}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default ThemeSelector
