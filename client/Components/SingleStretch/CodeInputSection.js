/* eslint-disable complexity */
import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import CodeEditor, {
  AuxillaryComponents,
  codeEditorFunctions
} from '../CodeEditor'
const { runCode, clearCodeResults } = codeEditorFunctions
const {
  ThemeSelector,
  RunCodeButton,
  ClearCodeResultsButton,
  CommonEditorAndOutput
} = AuxillaryComponents

class CodeInputSection extends Component {
  constructor() {
    super()
    this.state = {
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
    const { language, userDetails } = this.props
    if (language === 'jsx') {
      axios.delete(`/api/code/file-${userDetails.id}`)
    }
  }

  render() {
    const { runCodeBinded, clearCodeResultsBinded } = this
    const { codeResponse, codeError, fileGenerated } = this.state
    const {
      initialCodePrompt,
      initialSolution,
      language,
      mode,
      handleCodeChange,
      userDetails
    } = this.props
    let readOnlyLinesRegEx = {
      codePrompt: /\/\/ Write the code prompt below this line/,
      solutionStart: /\/\/ Write the solution below this line/,
      solutionEnd: /\/\/ Write the solution above this line/
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

    let solutionAnnonated
    if (mode === 'create') {
      solutionAnnonated = `// Write the code prompt below this line------\n\n${initialCodePrompt}\n\n// Write the solution below this line---------\n\n${initialSolution ||
        ''}\n// Write the solution above this line----------\n${
        language === 'jsx' ? jsxBarriers.string : ''
      }`
    } else if (mode === 'read') {
      solutionAnnonated = `// Code Prompt------\n\n${initialCodePrompt}\n\n// Author Solution---------\n\n${initialSolution}`
    } else if (mode === 'update') {
      solutionAnnonated = `// Write the code prompt below this line------\n\n${initialCodePrompt}\n\n// Write the solution below this line---------\n\n${initialSolution}\n\n// Write the solution above this line----------\n${
        language === 'jsx' ? jsxBarriers.string : ''
      }`
    }
    return (
      <Grid container>
        <Grid item xs={12}>
          <RunCodeButton
            color="primary"
            runCode={runCodeBinded}
            postPayload={{
              code: this.state.codeToRun,
              language,
              fileName:
                language === 'javascript' ? '' : `file-${userDetails.id}`
            }}
          />
          <ClearCodeResultsButton
            color="secondary"
            clearCodeResults={clearCodeResultsBinded}
          />
        </Grid>
        <CommonEditorAndOutput
          codeTargetName={mode === 'read' ? 'readStretch' : 'createStretch'}
          initialCode={solutionAnnonated}
          editorTheme="monokai"
          fileName={`/temp/file-${userDetails.id}.html`}
          changeCodeToRun={codeToRun => this.setState({ codeToRun })}
          readOnly={mode === 'read'}
          {...{
            language,
            fileGenerated,
            codeResponse,
            codeError,
            handleCodeChange,
            readOnlyLinesRegEx
          }}
        />
      </Grid>
    )
  }
}

const mapDispatchToProps = {}

export default connect(
  ({ userDetails }) => ({ userDetails }),
  mapDispatchToProps
)(CodeInputSection)
