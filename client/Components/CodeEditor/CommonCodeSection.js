import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import functions from './functions'
const { runCode, clearCodeResults } = functions
import ThemeSelector from './ThemeSelector'
import RunCodeButton from './RunCodeButton'
import ClearCodeResultsButton from './ClearCodeResultsButton'
import CommonEditorAndOutput from './CommonEditorAndOutput'

import Grid from '@material-ui/core/Grid'
import { codeSectionStyles } from '../StretchReviewView/styles'

class CommonCodeSection extends Component {
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
      fileName
    } = this.props
    if (language === 'jsx') {
      axios.delete(`/api/code/${fileName}`)
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
      handleCodeChange,
      //readOnlyLinesRegEx,
      //jsxBarriers,
      codeTargetName,
      fileName,
      stretch: { language, codePrompt }
      // cohortStretchId,
      //userDetails
    } = this.props

    const codeCommentWord =
      codeTargetName === 'studentAnswerRun' ? 'answer' : 'solution'

    let readOnlyLinesRegEx = {
      solutionStart: `Write your ${codeCommentWord} below this line`
    }

    const jsxBarriers = {
      string: `// Write your ${codeCommentWord} above this line\n\n// Return component to render inside App component\nconst App = () => {\n\n} // End Of App component\n\nReactDOM.render(<App />,document.querySelector('#app'))`,
      regExToCheck: {
        solutionEnd: `Write your ${codeCommentWord} above this line`,
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
    console.log(codeTargetName)

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
                    fileName: language === 'javascript' ? '' : fileName
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
          //codeTargetName="studentAnswerRun"
          fileName={`/temp/${fileName}.html`}
          initialCode={`// Code Prompt\n\n/*${codePrompt}*/\n\n// Write your ${codeCommentWord} below this line --------------------------------\n\n${
            language === 'jsx' ? jsxBarriers.string : ''
          }`}
          // handleCodeChange={handleCodeChange}
          changeCodeToRun={codeToRun => this.setState({ codeToRun })}
          {...{
            handleCodeChange,
            language,
            editorTheme,
            fileGenerated,
            codeResponse,
            codeError,
            codeTargetName,
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

export default connect(mapStateToProps)(CommonCodeSection)
