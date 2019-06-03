import React from 'react'
import Select from '@material-ui/core/Select'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import MenuItem from '@material-ui/core/MenuItem'

const EditorThemeInput = ({ theme, changeTheme }) => {
  //let [theme, changeTheme] = useState('monokai')
  return (
    <Select
      value={theme}
      onChange={changeTheme}
      input={<OutlinedInput name="editorTheme" />}
    >
      {['monokai', 'github', 'tomorrow', 'kuroir'].map(el => (
        <MenuItem key={el} value={el}>
          {el}
        </MenuItem>
      ))}
    </Select>
  )
}

export default EditorThemeInput
