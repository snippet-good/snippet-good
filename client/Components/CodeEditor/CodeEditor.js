/* eslint-disable complexity */
import React, { Component } from 'react'
import configEditor from './configeditor'

class AceEditor extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    const { editorId, startBarrierData } = this.props
    this.state = {
      editor: {},
      editorSession: {},
      selection: {},
      firstLineCanEdit: startBarrierData
        ? startBarrierData.numberOfLines || 0
        : 0,
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
      endBarrierRegEx,
      startBarrierData,
      changeCodeToRun
    } = this.props
    const editor = ace.edit(this.state.editorId)
    const editorSession = editor.getSession()
    const selection = editorSession.selection
    const codePromptRowCount = initialCode ? initialCode.split('\n').length : ''
    this.configEditor(
      editor,
      { editorSession, selection },
      {
        initialCode,
        editorTheme,
        language,
        endBarrierRegEx,
        startBarrierData,
        readOnly: !!readOnly
      },
      { handleCodeChange, changeCodeToRun },
      codeTargetName,
      codePromptRowCount
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
      endBarrierRegEx,
      startBarrierData,
      handleCodeChange,
      changeCodeToRun
    } = this.props

    if (prevProps.language !== language && language !== '') {
      this.state.editorSession.setMode(`ace/mode/${language}`)
      this.state.editor.setValue('')
    }
    if (
      startBarrierData &&
      prevProps.startBarrierData.numberOfLines !==
        startBarrierData.numberOfLines
    ) {
      this.setState({ firstLineCanEdit: startBarrierData.numberOfLines })
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
          endBarrierRegEx,
          startBarrierData,
          readOnly: !!readOnly
        },
        { handleCodeChange, changeCodeToRun },
        codeTargetName,
        0
      )
    }
    if (prevProps.editorTheme !== editorTheme) {
      this.state.editor.setTheme(`ace/theme/${editorTheme}`)
    }
    if (prevProps.readOnly !== readOnly) {
      this.state.editor.setReadOnly(readOnly)
    }
  }

  componentWillUnmount() {
    if (typeof this.props.onUnmount === 'function') {
      this.props.onUnmount()
    }
  }

  render() {
    const { editorId } = this.state
    return <div id={editorId} />
  }
}

export default AceEditor
