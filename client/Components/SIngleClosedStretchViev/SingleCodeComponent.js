/* eslint-disable complexity */
import React, { Component } from 'react'
import axios from 'axios'
import CodeEditor, {
  AuxillaryComponents,
  codeEditorFunctions
} from '../CodeEditor'
const { runCode, clearCodeResults } = codeEditorFunctions
const {
  RunCodeButton,
  ClearCodeResultsButton,
  CodeOutput
} = AuxillaryComponents

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { buttonsStyles, editorsStyles, outputStyles } from './styles'

class SingleCodeComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: this.props.savedCode || '',
      savedCode: this.props.savedCode || '',
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

  componentDidUpdate(prevProps) {
    const { savedCode } = this.props
    if (prevProps.savedCode !== savedCode && savedCode !== '') {
      this.setState({ savedCode })
    }
  }

  componentWillUnmount() {
    this.removeTemporaryUserFiles()
  }

  removeTemporaryUserFiles() {
    const { language, stretchAnswerId } = this.props
    if (language === 'jsx') {
      axios.delete(`/api/code/file-${stretchAnswerId}`)
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  render() {
    const { runCodeBinded, clearCodeResultsBinded, handleChange } = this
    const {
      code,
      codeResponse,
      codeError,
      savedCode,
      fileGenerated
    } = this.state
    const { editorTheme, editorId, language, stretchAnswerId } = this.props
    const { root } = editorsStyles()

    let readOnlyLinesRegEx =
      language === 'jsx'
        ? {
            render: /ReactDOM.render\(<App \/>,/,
            string: /\/\/ Return component to render inside App component/,
            appComponentStart: /const App = \(\) => {/,
            appComponentEnd: /} \/\/ End Of App component/
          }
        : {}

    return (
      <Grid container>
        <Grid item xs={12}>
          <CodeEditor
            codeTargetName="code"
            editorTheme={editorTheme}
            handleCodeChange={handleChange}
            editorId={editorId}
            initialCode={savedCode}
            language={language}
            readOnlyLinesRegEx={readOnlyLinesRegEx}
          />
        </Grid>
        <Grid item xs={12} style={root}>
          <Grid container>
            <Grid item xs={3}>
              <Grid container>
                <Grid item xs={12}>
                  <RunCodeButton
                    color="primary"
                    runCode={runCodeBinded}
                    postPayload={{
                      code,
                      language,
                      fileName:
                        language === 'javascript'
                          ? ''
                          : `file-${stretchAnswerId}`
                    }}
                    style={buttonsStyles.singleButton}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ClearCodeResultsButton
                    color="secondary"
                    clearCodeResults={clearCodeResultsBinded}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={7}>
              <Grid container>
                {language === 'jsx' && (
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle2"
                      style={outputStyles.outputLabels}
                    >
                      JSX Rendering
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12}>
                  {language === 'jsx' && (
                    <iframe
                      src={
                        fileGenerated
                          ? `/temp/file-${stretchAnswerId}.html`
                          : ''
                      }
                      style={outputStyles.iframe}
                    />
                  )}
                  {language === 'javascript' && (
                    <CodeOutput
                      {...{ codeResponse, codeError, minHeight: '5rem' }}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {language === 'jsx' && (
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={3}>
                <div />
              </Grid>
              <Grid item xs={7}>
                <Grid container>
                  <Grid item xs={12}>
                    {language === 'jsx' && (
                      <Typography
                        variant="subtitle2"
                        style={outputStyles.outputLabels}
                      >
                        Console
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <CodeOutput
                      {...{ codeResponse, codeError, minHeight: '5rem' }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    )
  }
}

export default SingleCodeComponent
