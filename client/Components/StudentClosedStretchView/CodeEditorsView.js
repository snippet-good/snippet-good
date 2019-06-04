import React, { useState } from 'react'
import { CodeEditor } from '../../Components'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import { editorsStyles } from './styles'

const CodeEditorsView = ({ studentAnswer, solutions }) => {
  const { center, select, solutionSelect } = editorsStyles()
  let [shownSolution, setSolution] = useState(
    solutions.find(s => s.dropdownTitle === 'Cohort Solution').solution
  )
  let [theme, setTheme] = useState('monokai')
  return (
    <Grid container justify="center" spacing={2}>
      <Grid item xs={12} className={center}>
        <FormControl className={select}>
          <InputLabel shrink htmlFor="editor-theme">
            Editor Theme
          </InputLabel>
          <Select
            id="editor-theme"
            value={theme}
            onChange={({ target }) => setTheme(target.value)}
          >
            {['monokai', 'github', 'tomorrow', 'kuroir'].map(el => (
              <MenuItem key={el} value={el}>
                {el}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={solutionSelect}>
          <InputLabel shrink htmlFor="solution">
            Solution
          </InputLabel>
          <Select
            id="solution"
            value={shownSolution}
            onChange={({ target }) => setSolution(target.value)}
          >
            {solutions.map(el => {
              const { dropdownTitle, solution } = el

              return (
                <MenuItem key={dropdownTitle} value={solution}>
                  {dropdownTitle}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <CodeEditor
          code={studentAnswer}
          editorId="studentSolution"
          showRunButton={true}
          saveButtonText="Update"
          theme={theme}
        />
      </Grid>
      <Grid item xs={6}>
        <CodeEditor
          code={shownSolution}
          editorId="adminSolution"
          showRunButton={true}
          theme={theme}
        />
      </Grid>
    </Grid>
  )
}

export default CodeEditorsView
