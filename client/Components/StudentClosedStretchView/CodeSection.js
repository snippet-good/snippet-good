import React, { Component } from 'react'
import SingleCodeComponent from './SingleCodeComponent'
import { AuxillaryComponents } from '../CodeEditor'
const { ThemeSelector } = AuxillaryComponents

import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import { editorsStyles } from './styles'

class CodeSection extends Component {
  constructor(props) {
    super(props)
    const cohortSolution = this.props.solutions.find(
      s => s.dropdownTitle === 'Cohort Solution'
    )
    this.state = {
      editorTheme: 'monokai',
      solution: cohortSolution ? cohortSolution.solution : ''
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  render() {
    const { studentAnswer, solutions, codePrompt, language } = this.props
    const { center, select, solutionSelect } = editorsStyles()
    const { editorTheme, solution } = this.state
    const { handleChange } = this
    return (
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12} style={center}>
          <ThemeSelector {...{ editorTheme, handleChange }} style={select} />
          <FormControl style={solutionSelect}>
            <InputLabel shrink htmlFor="solution">
              Solution
            </InputLabel>
            <Select
              id="solution"
              name="solution"
              value={solution}
              onChange={handleChange}
            >
              {solutions.map((el, idnx) => {
                const { dropdownTitle } = el
                return (
                  <MenuItem key={idnx} value={el.solution}>
                    {dropdownTitle}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <SingleCodeComponent
              savedCode={`${codePrompt}\n\n${studentAnswer}`}
              editorId="student"
              {...{ editorTheme, handleChange, language }}
            />
          </Grid>
          <Grid item xs={6}>
            <SingleCodeComponent
              savedCode={`${codePrompt}\n\n${solution}`}
              editorId="admin"
              {...{ editorTheme, handleChange, language }}
            />
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default CodeSection
