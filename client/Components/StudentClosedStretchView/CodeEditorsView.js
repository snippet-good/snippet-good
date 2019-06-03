import React, { useState } from 'react'
import { CodeEditor } from '../../Components'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const CodeEditorsView = ({ studentAnswer, solutions }) => {
  let [shownSolution, setSolution] = useState(
    solutions.find(s => s.dropdownTitle === 'Cohort Solution').solution
  )
  return (
    <Grid container justify="center" alignItems="center" spacing={2}>
      <Grid item xs={6}>
        <CodeEditor code={studentAnswer} editorId="studentSolution" showRunButton={true} saveButtonText="Update"/>
      </Grid>
      <Grid item xs={6}>
        {solutions.length && (
          <div>
            <Select
              value={shownSolution}
              onChange={({ target }) => setSolution(target.value)}
              name="Solution"
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

            <CodeEditor code={shownSolution} editorId="adminSolution" showRunButton={true} />
          </div>
        )}
      </Grid>
    </Grid>
  )
}

export default CodeEditorsView
