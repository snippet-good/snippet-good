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
    let initialState = {
      code: this.props.code || '',
      codeResponse: '',
      codeError: ''
    }
    if (this.props.editorId === 'admin') {
      initialState.showSavedCode = true
    }
    this.state = initialState
    this.runCodeBinded = runCode.bind(this)
    this.clearCodeResultsBinded = clearCodeResults.bind(this)
  }

  handleChange = ({ target }) => {
    let objectChange = { [target.name]: target.value }
    if (target.name === 'code' && this.state.showSavedCode !== undefined) {
      objectChange.showSavedCode = false
    }
    this.setState(objectChange)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.code !== this.props.code) {
      let objectChange = { code: this.props.code }
      if (this.state.showSavedCode !== undefined)
        objectChange.showSavedCode = true
      this.setState(objectChange)
    }
  }

  render() {
    const { runCodeBinded, clearCodeResultsBinded, handleChange } = this
    const { code, codeResponse, codeError, showSavedCode } = this.state
    const { editorTheme, editorId } = this.props
    const { root } = editorsStyles()
    return (
      <Grid container>
        <Grid item xs={12}>
          <CodeEditor
            codeTargetName="code"
            code={code}
            editorTheme={editorTheme}
            handleCodeChange={handleChange}
            editorId={editorId}
            showSavedCode={showSavedCode}
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
