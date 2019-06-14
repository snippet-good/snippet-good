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

    this.setState(
      curState => {
        const editor = ace.edit(curState.editorId)
        const editorSession = editor.getSession()
        if (initialCode) editor.setValue(initialCode)
        if (editorTheme) editor.setTheme(`ace/theme/${editorTheme}`)
        editor.setReadOnly(!!readOnly)
        return { ...curState, editor, editorSession }
      },
      function() {
        const { editor, editorSession } = this.state

        this.configEditor(
          editor,
          editorSession,
          language,
          handleCodeChange,
          codeTargetName
        )
      }
    )
  }

  componentDidUpdate(prevProps) {
    const { language, editorTheme, readOnly, initialCode } = this.props
    if (prevProps.language !== language && language !== '') {
      this.state.editorSession.setMode(`ace/mode/${language}`)
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
