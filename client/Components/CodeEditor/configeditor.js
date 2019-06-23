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

export const excludeCodePromptInStretchAnswer = (
  { codePromptRowCount, editor },
  editorSession,
  codeTargetName,
  endBarrierRegEx,
  startBarrierData,
  initialCode
) => {
  const currentCode = initialCode || editorSession.getValue()
  if (codeTargetName === 'authorSolution' && currentCode) {
    return currentCode.slice(
      startBarrierData.length,
      currentCode.search(endBarrierRegEx)
    )
  }

  let documentRowCount = editorSession.getLength()
  const arrayOfStretchLines = editorSession.getLines(
    codePromptRowCount,
    documentRowCount
  )
  return arrayOfStretchLines.reduce((acc, line) => {
    acc += `${line} \n`
    return acc
  }, [])
}

const configEditor = function(
  editor,
  { editorSession, selection },
  userOptions,
  { handleCodeChange, changeCodeToRun },
  codeTargetName,
  codePromptRowCount
) {
  const {
    initialCode,
    editorTheme,
    language,
    endBarrierRegEx,
    startBarrierData,
    readOnly
  } = userOptions
  editorSession.setMode(`ace/mode/${language}`)
  if (initialCode) editor.setValue(initialCode)
  if (editorTheme) editor.setTheme(`ace/theme/${editorTheme}`)
  editor.setReadOnly(readOnly)

  editor.setShowPrintMargin(false)
  editor.setOptions({ minLines: 15 })
  editor.setOptions({ maxLines: 40 })
  editor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    fontSize: 18,
    enableSnippets: true
  })

  selection.on('changeCursor', () => {
    if (endBarrierRegEx) {
      const currentCode = editorSession.getValue()
      if (editor.getCursorPosition().row <= this.state.firstLineCanEdit) {
        editor.setReadOnly(true)
      } else {
        editor.setReadOnly(false)
      }

      if (
        ['studentAnswer', 'authorSolution'].includes(codeTargetName) &&
        currentCode
      ) {
        const rg = currentCode.split('\n')[editor.getCursorPosition().row]
        if (rg && rg.search(endBarrierRegEx) >= 0) {
          editor.setReadOnly(true)
        }
      }
    }
  })
  editorSession.on('change', () => {
    addClosingCurlyBracket(editor, editorSession)
    handleCodeChange({
      target: {
        name: codeTargetName,
        value: `${
          ['studentAnswer', 'authorSolution'].includes(codeTargetName)
            ? excludeCodePromptInStretchAnswer(
                { codePromptRowCount, editor },
                editorSession,
                codeTargetName,
                endBarrierRegEx,
                startBarrierData
              )
            : editorSession.getValue()
        }`
      }
    })
    if (['studentAnswer', 'authorSolution'].includes(codeTargetName)) {
      changeCodeToRun(editorSession.getValue())
    }
  })
}

export default configEditor
