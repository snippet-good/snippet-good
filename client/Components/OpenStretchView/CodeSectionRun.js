import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { AuxillaryComponents, codeEditorFunctions } from '../CodeEditor'
const { runCode, clearCodeResults } = codeEditorFunctions
const {
  ThemeSelector,
  RunCodeButton,
  ClearCodeResultsButton,
  CommonEditorAndOutput
} = AuxillaryComponents

import Grid from '@material-ui/core/Grid'
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
    console.log(stretchAnswer)
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
        <CommonEditorAndOutput
          codeTargetName="codeAnswer"
          fileName={`/temp/file-${cohortStretchId}-${userDetails.id}.html`}
          initialCode={codePrompt}
          handleCodeChange={({ target }) => setStretchAnswer(target.value)}
          {...{ language, editorTheme, fileGenerated, codeResponse, codeError }}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ stretches, userDetails }, { stretchId }) => ({
  stretch: stretches.find(s => s.id === stretchId),
  userDetails
})

export default connect(mapStateToProps)(CodeSectionRun)
