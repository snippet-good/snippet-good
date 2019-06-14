import React, { Component } from 'react'
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
import { buttonsStyles, editorsStyles } from './styles'

class SingleCodeComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: this.props.savedCode || '',
      savedCode: this.props.savedCode || '',
      codeResponse: '',
      codeError: ''
    }
    this.runCodeBinded = runCode.bind(this)
    this.clearCodeResultsBinded = clearCodeResults.bind(this)
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  componentDidUpdate(prevProps) {
    const { savedCode } = this.props
    if (prevProps.savedCode !== savedCode && savedCode !== '') {
      this.setState({ savedCode })
    }
  }

  render() {
    const { runCodeBinded, clearCodeResultsBinded, handleChange } = this
    const { code, codeResponse, codeError, savedCode } = this.state
    const { editorTheme, editorId, language } = this.props
    const { root } = editorsStyles()
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
          />
        </Grid>
        <Grid item xs={12} style={root}>
          <Grid container>
            <Grid item xs={3}>
              <Grid container>
                <Grid item xs={12}>
                  <RunCodeButton
                    color="primary"
                    code={code}
                    runCode={runCodeBinded}
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
              <CodeOutput {...{ codeResponse, codeError, minHeight: '5rem' }} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default SingleCodeComponent
