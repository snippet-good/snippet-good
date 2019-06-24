/* eslint-disable complexity */
import React, { Component } from 'react'
import configEditor from './configeditor'

class AceEditor extends Component {
  constructor(props) {
    super(props)
    const { editorId } = this.props
    this.state = {
      editor: {},
      editorSession: {},
      selection: {},
      editorId: editorId ? `ace-${editorId}` : 'ace'
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
      initialCode,
      changeCodeToRun,
      readOnlyLinesRegEx
    } = this.props
    const editor = ace.edit(this.state.editorId)
    const editorSession = editor.getSession()
    const selection = editorSession.selection
    this.configEditor(
      editor,
      { editorSession, selection },
      {
        initialCode,
        editorTheme,
        language,
        readOnlyLinesRegEx,
        readOnly: !!readOnly
      },
      { handleCodeChange, changeCodeToRun },
      codeTargetName
    )

    this.setState({ editor, editorSession, selection })
  }

  componentDidUpdate(prevProps) {
    const {
      language,
      editorTheme,
      readOnly,
      initialCode,
      codeTargetName,
      handleCodeChange,
      changeCodeToRun,
      readOnlyLinesRegEx
    } = this.props

    if (prevProps.language !== language && language !== '') {
      this.state.editor.setValue(initialCode || '')
      this.state.editorSession.setMode(`ace/mode/${language}`)
    }
    if (prevProps.initialCode !== initialCode && initialCode !== '') {
      this.state.editor.setValue(initialCode)
      this.configEditor(
        this.state.editor,
        {
          editorSession: this.state.editorSession,
          selection: this.state.selection
        },
        {
          initialCode,
          editorTheme,
          language,
          readOnlyLinesRegEx,
          readOnly: !!readOnly
        },
        { handleCodeChange, changeCodeToRun },
        codeTargetName
      )
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
