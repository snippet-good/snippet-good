import React, { Component } from 'react'
import configEditor from './configeditor'

class AceEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editor: {},
      editorId: this.props.editorId ? `ace-${this.props.editorId}` : 'ace'
    }
    this.configEditor = configEditor
  }

  componentDidMount() {
    const {
      editorTheme,
      handleCodeChange,
      codeTargetName,
      readOnly,
      initialCode
    } = this.props

    this.setState(
      curState => {
        const editor = ace.edit(curState.editorId)
        if (initialCode) editor.setValue(initialCode)
        if (editorTheme) editor.setTheme(`ace/theme/${editorTheme}`)
        editor.setReadOnly(!!readOnly)
        return { ...curState, editor }
      },
      function() {
        const { editor } = this.state
        const editorSession = editor.getSession()
        this.configEditor(
          editor,
          editorSession,
          handleCodeChange,
          codeTargetName
        )
      }
    )
  }

  componentDidUpdate(prevProps) {
    const { editorTheme, readOnly, initialCode } = this.props
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
