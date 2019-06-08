import React, { Component } from 'react'
import configEditor from './configeditor'
//import { runCodeThunk } from '../../store/codeOutput/actions'
import { connect } from 'react-redux'
import OutputAndButtons from './OutputAndButtons'

import Grid from '@material-ui/core/Grid'

class AceEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '',
      codeResponse: '',
      codeError: '',
      editor: {},
      editorTheme: 'monokai',
      editorId: this.props.editorId ? `ace-${this.props.editorId}` : 'ace'
    }
    this.configEditorBinded = configEditor.bind(this)
  }

  componentDidMount() {
    const { code, editorTheme, handleCodeChange } = this.props
    this.setState(
      curState => {
        const editor = ace.edit(curState.editorId)
        if (code) editor.setValue(code)
        if (editorTheme) editor.setTheme(`ace/theme/${editorTheme}`)
        return { ...curState, editor }
      },
      function() {
        const { editor, editorTheme } = this.state
        const editorSession = editor.getSession()
        this.configEditorBinded(
          editor,
          editorSession,
          editorTheme,
          false,
          handleCodeChange
        )
      }
    )
  }

  componentDidUpdate(prevProps) {
    const { code, showSavedCode } = this.props
    if (showSavedCode && prevProps.code !== code) {
      console.log('uodate')
      console.log(prevProps.code)
      console.log(this.props.code)
      this.state.editor.setValue(code)
    }
    if (prevProps.editorTheme !== this.props.editorTheme) {
      this.state.editor.setTheme(`ace/theme/${this.props.editorTheme}`)
    }
  }

  runCode = () => {
    this.setState({ codeResponse: '', codeError: '' }, () => {
      return this.props
        .runCodeResult(this.state.code)
        .then(({ data }) => {
          this.setState({
            codeResponse: String(data)
          })
        })
        .catch(({ response: { data } }) => {
          this.setState({ codeError: data })
        })
    })
  }

  clearCodeResults = () => {
    this.setState({ codeResponse: '', codeError: '' })
  }

  saveCodeToDatabase = () => {
    const { editor, code } = this.state
    return this.props.saveItemWithCodeField(code).then(() => {
      editor.setValue('')
      this.setState({
        code: '',
        codeResponse: '',
        codeError: ''
      })
    })
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => {
      this.state.editor.setTheme(`ace/theme/${this.state.editorTheme}`)
    })
  }

  render() {
    const { editorTheme, codeError, codeResponse, editorId } = this.state
    const { showRunButton, saveButtonText, theme } = this.props
    const { runCode, clearCodeResults, saveCodeToDatabase } = this
    return <div id={editorId} />
  }
}

const mapDispatchToProps = dispatch => {
  return {
    runCodeResult: code => dispatch({})
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AceEditor)
