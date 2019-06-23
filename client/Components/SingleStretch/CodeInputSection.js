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
    //  const startBarrierRegEx = new RegExp(initialCodePrompt)
    //   `${initialCodePrompt}\n\n// Write the soluton below this line --------------------------------\n`
    const startBarrierString = `${initialCodePrompt}\n\n// Write the soluton below this line --------------------------------\n`
    const startBarrierData = {
      length: startBarrierString.length,
      numberOfLines: startBarrierString.split('\n').length - 2
    }
    const endBarrierString = `// Write the solution above this line-----------------\n `
    const endBarrierRegEx = /\/\/ Write the solution above this line-----------------/
    const solutionAnnonated = `${startBarrierString}${initialSolution}\n${endBarrierString}`
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
                    startBarrierData
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
