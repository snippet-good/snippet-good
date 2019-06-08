const addClosingCurlyBracket = (editor, editorSession) => {
  const cursorPosition = editor.getCursorPosition()
  const enteredCharacterPosition = {
    start: { ...cursorPosition },
    end: { ...cursorPosition, column: cursorPosition.column + 1 }
  }
  const { end } = enteredCharacterPosition
  const nextCharacterPosition = {
    start: end,
    end: { ...end, column: end.column + 1 }
  }
  if (
    editorSession.getTextRange(enteredCharacterPosition) === '{' &&
    editorSession.getTextRange(nextCharacterPosition) !== '}'
  ) {
    editorSession.insert(nextCharacterPosition.start, '}')
  }
}

const configEditor = function(
  editor,
  editorSession,
  editorTheme,
  themeFromState,
  handleCodeChange
) {
  if (themeFromState) editor.setTheme(`ace/theme/${editorTheme}`)
  editorSession.setMode('ace/mode/javascript')
  editor.setShowPrintMargin(false)
  editor.setOptions({ minLines: 15 })
  editor.setOptions({ maxLines: 40 })
  editor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    fontSize: 18,
    enableSnippets: true
  })

  editorSession.on('change', () => {
    addClosingCurlyBracket(editor, editorSession)
    if (typeof handleCodeChange === 'function') {
      handleCodeChange(editorSession.getValue())
    } else {
      this.setState({ code: editorSession.getValue() })
      this.props.setStretchAnswer(this.state.code)
    }
  })
}

export default configEditor
