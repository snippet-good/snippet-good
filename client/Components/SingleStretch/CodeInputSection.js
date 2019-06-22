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
      initialCode,
      language,
      mode,
      handleCodeChange,
      userDetails,
      authorSolution
    } = this.props
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
                initialCode={initialCode}
                codeTargetName="codePrompt"
                handleCodeChange={handleCodeChange}
                language={language}
                readOnly={mode === 'read'}
              />
            )}
            {currentTab === 1 && (
              <Grid container>
                <Grid item xs={12}>
                  <RunCodeButton
                    color="primary"
                    runCode={runCodeBinded}
                    postPayload={{
                      code: authorSolution,
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
                  initialCode={authorSolution}
                  editorTheme="monokai"
                  fileName={`file-${userDetails.id}.html`}
                  {...{
                    language,
                    fileGenerated,
                    codeResponse,
                    codeError,
                    handleCodeChange
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
