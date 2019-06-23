import React, { Component } from 'react'
import axios from 'axios'
import { AuxillaryComponents, codeEditorFunctions } from '../CodeEditor'
const { runCode, clearCodeResults } = codeEditorFunctions
const {
  ThemeSelector,
  RunCodeButton,
  ClearCodeResultsButton,
  CommonEditorAndOutput
} = AuxillaryComponents

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { codeSectionStyles } from './styles'

class CodeSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorTheme: 'monokai',
      classroomCode: '',
      solution: this.props.outlinedCode,
      codeResponse: '',
      codeError: '',
      fileGenerated: false
    }
    this.runCodeBinded = runCode.bind(this)
    this.clearCodeResultsBinded = clearCodeResults.bind(this)
  }

  componentDidMount() {
    this.removeTemporaryUserFiles()
  }

  componentWillUnmount() {
    this.removeTemporaryUserFiles()
  }

  removeTemporaryUserFiles() {
    const { language, cohortStretchId } = this.props
    if (language === 'jsx') {
      axios.delete(`/api/code/file-${cohortStretchId}`)
    }
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
    const {
      editorTheme,
      classroomCode,
      codeResponse,
      codeError,
      solution,
      fileGenerated
    } = this.state
    const {
      runCodeBinded,
      clearCodeResultsBinded,
      handleChange,
      showSolution
    } = this
    const { language, cohortStretchId, jsxBarriers } = this.props
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
                  postPayload={{
                    code: classroomCode,
                    language,
                    fileName:
                      language === 'javascript' ? '' : `file-${cohortStretchId}`
                  }}
                />
                <ClearCodeResultsButton
                  color="secondary"
                  clearCodeResults={clearCodeResultsBinded}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <CommonEditorAndOutput
          codeTargetName="classroomCode"
          fileName={`/temp/file-${cohortStretchId}.html`}
          initialCode={solution}
          handleCodeChange={handleChange}
          {...{
            language,
            editorTheme,
            fileGenerated,
            codeResponse,
            codeError,
            jsxBarriers
          }}
        />
      </div>
    )
  }
}

export default CodeSection
