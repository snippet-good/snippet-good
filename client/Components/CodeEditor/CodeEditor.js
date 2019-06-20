import React, { Component } from 'react'
import configEditor from './configeditor'

class AceEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editor: {},
      editorSession: {},
      editorId: this.props.editorId ? `ace-${this.props.editorId}` : 'ace'
    }
    this.configEditor = configEditor
  }

  componentDidMount() {
    const {
      language,
      editorTheme,
      handleCodeChange,
      codeTargetName,
      readOnly,
      initialCode
    } = this.props

    const editor = ace.edit(this.state.editorId)
    const editorSession = editor.getSession()
    const codePromptRowCount = initialCode ? initialCode.split('\n').length : ''
    this.configEditor(
      editor,
      editorSession,
      { initialCode, editorTheme, language, readOnly: !!readOnly },
      handleCodeChange,
      codeTargetName,
      codePromptRowCount
    )

    this.setState({ editor, editorSession })
  }

  componentDidUpdate(prevProps) {
    const { language, editorTheme, readOnly, initialCode } = this.props
    if (prevProps.language !== language && language !== '') {
      this.state.editorSession.setMode(`ace/mode/${language}`)
      this.state.editor.setValue('')
    }
    if (prevProps.initialCode !== initialCode && initialCode !== '') {
      this.state.editor.setValue(initialCode)
    }
    if (prevProps.editorTheme !== editorTheme) {
      this.state.editor.setTheme(`ace/theme/${editorTheme}`)
    }
    if (prevProps.readOnly !== readOnly) {
      this.state.editor.setReadOnly(readOnly)
    }
  }

  render() {
    const { editorId } = this.state
    return <div id={editorId} />
  }
}

export default AceEditor
