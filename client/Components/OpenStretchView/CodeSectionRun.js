import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
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
import Typography from '@material-ui/core/Typography'
import { codeSectionStyles } from '../StretchReviewView/styles'

class CodeSectionRun extends Component {
  constructor() {
    super()
    this.state = {
      editorTheme: 'monokai',
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
    const {
      stretch: { language },
      cohortStretchId,
      userDetails
    } = this.props
    if (language === 'jsx') {
      axios.delete(`/api/code/file-${cohortStretchId}-${userDetails.id}`)
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  render() {
    const { editorTheme, codeResponse, codeError, fileGenerated } = this.state
    const { runCodeBinded, clearCodeResultsBinded, handleChange } = this
    const {
      setStretchAnswer,
      stretchAnswer,
      stretch: { language, codePrompt },
      cohortStretchId,
      userDetails
    } = this.props
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
                  postPayload={{
                    code: stretchAnswer,
                    language,
                    fileName:
                      language === 'javascript'
                        ? ''
                        : `file-${cohortStretchId}-${userDetails.id}`
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
              initialCode={codePrompt}
              editorTheme={editorTheme}
              handleCodeChange={({ target }) => setStretchAnswer(target.value)}
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
                src={
                  fileGenerated
                    ? `/temp/file-${cohortStretchId}-${userDetails.id}.html`
                    : ''
                }
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

const mapStateToProps = ({ stretches, userDetails }, { stretchId }) => ({
  stretch: stretches.find(s => s.id === stretchId),
  userDetails
})

export default connect(mapStateToProps)(CodeSectionRun)
