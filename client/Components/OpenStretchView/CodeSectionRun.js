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
import { codeSectionStyles } from '../StretchReviewView/styles'

class CodeSectionRun extends Component {
  constructor() {
    super()
    this.state = {
      editorTheme: 'monokai',
      codeResponse: '',
      codeError: ''
    }
    this.runCodeBinded = runCode.bind(this)
    this.clearCodeResultsBinded = clearCodeResults.bind(this)
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  render() {
    const { editorTheme, codeResponse, codeError } = this.state
    const { runCodeBinded, clearCodeResultsBinded, handleChange } = this
    const { codePrompt, setStretchAnswer, stretchAnswer } = this.props
    return (
      <div>
        <Grid container>
          <Grid item xs={6}>
            <ThemeSelector {...{ editorTheme, handleChange }} />
          </Grid>
          <Grid item xs={6}>
            <Grid container style={codeSectionStyles.controls}>
              <Grid item xs={12}>
                <RunCodeButton
                  color="primary"
                  runCode={runCodeBinded}
                  code={stretchAnswer}
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
              initialCode={codePrompt}
              editorTheme={editorTheme}
              handleCodeChange={({ target }) => setStretchAnswer(target.value)}
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

export default CodeSectionRun
