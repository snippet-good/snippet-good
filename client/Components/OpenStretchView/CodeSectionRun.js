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
      codeToRun: '',
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
    const {
      editorTheme,
      codeResponse,
      codeError,
      fileGenerated,
      codeToRun
    } = this.state
    const { runCodeBinded, clearCodeResultsBinded, handleChange } = this
    const {
      setStretchAnswer,
      stretchAnswer,
      stretch: { language, codePrompt },
      cohortStretchId,
      userDetails
    } = this.props
    const startBarrierString = `${codePrompt}\n\n// Write your answer below this line --------------------------------\n`
    const startBarrierData = {
      length: startBarrierString.length,
      numberOfLines: startBarrierString.split('\n').length - 2
    }
    const endBarrierString = `// Write your answer above this line-----------------\n `
    const endBarrierRegEx = /\/\/ Write your answer above this line-----------------/
    const solutionAnnonated = `${startBarrierString}\n${endBarrierString}`
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
                    code: codeToRun,
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
          codeTargetName="studentAnswerRun"
          fileName={`/temp/file-${cohortStretchId}-${userDetails.id}.html`}
          initialCode={solutionAnnonated}
          handleCodeChange={({ target }) => setStretchAnswer(target.value)}
          changeCodeToRun={codeToRun => this.setState({ codeToRun })}
          {...{
            language,
            editorTheme,
            fileGenerated,
            codeResponse,
            codeError,
            startBarrierData,
            endBarrierRegEx
          }}
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
