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

    let readOnlyLinesRegEx = {
      solutionStart: /\/\/ Write your answer below this line/,
      solutionEnd: /\/\/ Write your answer above this line/
    }

    const jsxBarriers = {
      string:
        "\n// Return component to render inside App component\nconst App = () => {\n\n} // End Of App component\n\nReactDOM.render(<App />,document.querySelector('#app'))",
      regExToCheck: {
        render: /ReactDOM.render\(<App \/>,/,
        string: /\/\/ Return component to render inside App component/,
        appComponentStart: /const App = \(\) => {/,
        appComponentEnd: /} \/\/ End Of App component/
      }
    }
    if (language === 'jsx') {
      readOnlyLinesRegEx = {
        ...readOnlyLinesRegEx,
        ...jsxBarriers.regExToCheck
      }
    }

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
          initialCode={`// Code Prompt\n\n${codePrompt}\n\n// Write your answer below this line --------------------------------\n\n// Write your answer above this line----------\n${
            language === 'jsx' ? jsxBarriers.string : ''
          }`}
          handleCodeChange={({ target }) => setStretchAnswer(target.value)}
          changeCodeToRun={codeToRun => this.setState({ codeToRun })}
          {...{
            language,
            editorTheme,
            fileGenerated,
            codeResponse,
            codeError,
            readOnlyLinesRegEx
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
