import React, { Component } from 'react'
import axios from 'axios'
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
import Typography from '@material-ui/core/Typography'

class CodeSection extends Component {
  constructor() {
    super()
    this.state = {
      editorTheme: 'monokai',
      code: '',
      solution: '',
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
      code,
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
    const { language, cohortStretchId } = this.props
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
                    code,
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
        <Grid container>
          <Grid item xs={6}>
            <CodeEditor
              codeTargetName="code"
              initialCode={solution}
              editorTheme={editorTheme}
              handleCodeChange={handleChange}
              language={language}
            />
          </Grid>
          <Grid item xs={6}>
            {language === 'jsx' && (
              <Typography
                variant="subtitle2"
                style={codeSectionStyles.outputLabels}
              >
                JSX Rendering
              </Typography>
            )}

            {language === 'jsx' && (
              <iframe
                src={fileGenerated ? `/temp/file-${cohortStretchId}.html` : ''}
                style={codeSectionStyles.iframe}
              />
            )}
            {language === 'jsx' && (
              <Typography
                variant="subtitle2"
                style={codeSectionStyles.outputLabels}
              >
                Console
              </Typography>
            )}
            <CodeOutput
              codeResponse={codeResponse}
              codeError={codeError}
              minHeight={`${language === 'jsx' ? '10' : '23'}rem`}
            />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default CodeSection
