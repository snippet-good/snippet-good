import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
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
      currentTab: 0,
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
    const { currentTab, codeResponse, codeError, fileGenerated } = this.state
    const {
      initialCodePrompt,
      initialSolution,
      language,
      mode,
      handleCodeChange,
      userDetails,
      authorSolution,
      codePrompt
    } = this.props
    const startBarrierString = `// Code Prompt\n${initialCodePrompt}\n\n// Write the soluton below this line --------------------------------\n`
    const startBarrierData = {
      length: startBarrierString.length,
      numberOfLines: startBarrierString.split('\n').length - 2,
      lastLine:
        'Write the soluton below this line --------------------------------'
    }
    const endBarrierString = `// Write the solution above this line-----------------\n `
    const endBarrierRegEx = /\/\/ Write the solution above this line-----------------/
    const jsxBarriers = {
      string:
        "\n//Put component to render as first argument in ReactDOM.render\nReactDOM.render(\n\n,document.querySelector('#app'))",
      regExToCheck: {
        render: /ReactDOM.render\(/,
        querySelector: /,document.querySelector\('#app'\)\)/,
        string: /\/\/Put component to render as first argument in ReactDOM.render/
      }
    }
    const solutionAnnonated = `${startBarrierString}${initialSolution}\n${endBarrierString}${
      language === 'jsx' ? jsxBarriers.string : ''
    }`
    return (
      <Grid container>
        <Grid item xs={12}>
          <Tabs
            value={currentTab}
            onChange={(event, tab) => this.setState({ currentTab: tab })}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            style={{ marginBottom: '2em' }}
          >
            <Tab label="Code Prompt" />
            <Tab label="Solution" />
          </Tabs>

          <Grid item xs={12}>
            {currentTab === 0 && (
              <CodeEditor
                initialCode={initialCodePrompt}
                codeTargetName="codePrompt"
                handleCodeChange={handleCodeChange}
                changeCodeToRun={codeToRun => this.setState({ codeToRun })}
                language={language}
                readOnly={mode === 'read'}
                startBarrierData={startBarrierData}
                onUnmount={() =>
                  handleCodeChange({
                    target: { name: 'initialCodePrompt', value: codePrompt }
                  })
                }
              />
            )}
            {currentTab === 1 && (
              <Grid container>
                <Grid item xs={12}>
                  <RunCodeButton
                    color="primary"
                    runCode={runCodeBinded}
                    postPayload={{
                      code: this.state.codeToRun,
                      language,
                      fileName:
                        language === 'javascript'
                          ? ''
                          : `file-${userDetails.id}`
                    }}
                  />
                  <ClearCodeResultsButton
                    color="secondary"
                    clearCodeResults={clearCodeResultsBinded}
                  />
                </Grid>
                <CommonEditorAndOutput
                  codeTargetName="authorSolution"
                  initialCode={solutionAnnonated}
                  editorTheme="monokai"
                  fileName={`/temp/file-${userDetails.id}.html`}
                  onUnmount={() =>
                    handleCodeChange({
                      target: { name: 'initialSolution', value: authorSolution }
                    })
                  }
                  changeCodeToRun={codeToRun => this.setState({ codeToRun })}
                  {...{
                    language,
                    fileGenerated,
                    codeResponse,
                    codeError,
                    handleCodeChange,
                    endBarrierRegEx,
                    startBarrierData,
                    jsxBarriers
                  }}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

const mapDispatchToProps = {}

export default connect(
  ({ userDetails }) => ({ userDetails }),
  mapDispatchToProps
)(CodeInputSection)
