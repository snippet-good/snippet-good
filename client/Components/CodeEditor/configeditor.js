const configEditor = function(editor, editorSession, editorTheme) {
  editor.setTheme(`ace/theme/${editorTheme}`)
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
    this.setState({ code: editorSession.getValue() })
  })
}

export default configEditor
