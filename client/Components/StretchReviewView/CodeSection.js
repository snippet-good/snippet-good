import React, { Component } from 'react'
import CodeEditor, {
  AuxillaryComponents,
  codeEditorFunctions
} from '../CodeEditor'
const { runCode, clearCodeResults } = codeEditorFunctions
const {
  ThemeSelector,
  RunCodeButton,
  ClearCodeResultsButton,
  CodeOutput
} = AuxillaryComponents

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { codeSectionStyles } from './styles'

class CodeSection extends Component {
  constructor() {
    super()
    this.state = {
      editorTheme: 'monokai',
      code: '',
      solution: '',
      codeResponse: '',
      codeError: ''
    }
    this.runCodeBinded = runCode.bind(this)
    this.clearCodeResultsBinded = clearCodeResults.bind(this)
  }

  handleChange = ({ target }) => {
    let objectChange = { [target.name]: target.value }
    if (target.name === 'code') objectChange.solution = ''
    this.setState(objectChange)
  }

  showSolution = () => {
    this.setState({ solution: this.props.solution })
  }

  render() {
    const { editorTheme, code, codeResponse, codeError, solution } = this.state
    const {
      runCodeBinded,
      clearCodeResultsBinded,
      handleChange,
      showSolution
    } = this
    return (
      <div>
        <Grid container>
          <Grid item xs={6}>
            <Grid container style={codeSectionStyles.controls}>
              <Grid item xs={6} style={codeSectionStyles.button}>
                <ThemeSelector {...{ editorTheme, handleChange }} />
              </Grid>
              <Grid item xs={4} style={codeSectionStyles.start}>
                <Button size="small" type="button" onClick={showSolution}>
                  {' '}
                  Show Solution
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container style={codeSectionStyles.controls}>
              <Grid item xs={12}>
                <RunCodeButton
                  color="primary"
                  runCode={runCodeBinded}
                  code={code}
                />
                <ClearCodeResultsButton
                  color="secondary"
                  clearCodeResults={clearCodeResultsBinded}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <CodeEditor
              codeTargetName="code"
              initialCode={solution}
              editorTheme={editorTheme}
              handleCodeChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <CodeOutput
              codeResponse={codeResponse}
              codeError={codeError}
              minHeight="23rem"
            />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default CodeSection
