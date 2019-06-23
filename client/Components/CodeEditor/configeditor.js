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
  editorSession,
  editor,
  endBarrierRegEx,
  startBarrierData,
  initialCode
) => {
  const currentCode = initialCode || editorSession.getValue()
  if (currentCode) {
    return currentCode.slice(
      startBarrierData.length,
      currentCode.search(endBarrierRegEx)
    )
  }
}

const checkIfDeletingLineBetweenTwoReadOnlyLines = (
  editor,
  editorSession,
  firstROLine,
  secondROLine
) => {
  const cursorRow = editor.getCursorPosition().row
  const codeSplitByLine = editorSession.getValue().split('\n')
  console.log('checktifd', cursorRow, codeSplitByLine)
  if (
    codeSplitByLine[cursorRow].search(firstROLine) >= 0 &&
    codeSplitByLine[cursorRow + 1].search(secondROLine) >= 0
  ) {
    editorSession.insert({ row: cursorRow + 1, column: 0 }, '\n')
  }
}

const checkIfCurentLineReadOnly = (
  currentLine,
  language,
  jsxBarriers,
  endBarrierRegEx,
  editor
) => {
  let onJXSRenderLine = false
  if (language === 'jsx') {
    for (let key in jsxBarriers.regExToCheck) {
      if (currentLine.search(jsxBarriers.regExToCheck[key]) >= 0) {
        onJXSRenderLine = true
        break
      }
    }
  }
  console.log('READONLY', currentLine, endBarrierRegEx)
  if (
    currentLine &&
    ((endBarrierRegEx && currentLine.search(endBarrierRegEx) >= 0) ||
      onJXSRenderLine)
  ) {
    editor.setReadOnly(true)
  }
}

const configEditor = function(
  editor,
  { editorSession, selection },
  userOptions,
  { handleCodeChange, changeCodeToRun },
  codeTargetName
) {
  console.log('at start of ocnfig editor')
  const {
    initialCode,
    editorTheme,
    language,
    endBarrierRegEx,
    startBarrierData,
    jsxBarriers,
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

  const codeHasAddedBehavior =
    codeTargetName === 'authorSolution' ||
    codeTargetName.startsWith('studentAnswer')

  selection.on('changeCursor', () => {
    const currentCode = editorSession.getValue()
    const currentLine = currentCode.split('\n')[editor.getCursorPosition().row]
    editor.setReadOnly(false)
    if (codeHasAddedBehavior) {
      if (editor.getCursorPosition().row <= this.state.firstLineCanEdit) {
        editor.setReadOnly(true)
      }

      if (currentCode) {
        checkIfCurentLineReadOnly(
          currentLine,
          language,
          jsxBarriers,
          endBarrierRegEx,
          editor
        )
      }
    }
    if (codeTargetName === 'classroomCode') {
      checkIfCurentLineReadOnly(
        currentLine,
        language,
        jsxBarriers,
        endBarrierRegEx,
        editor
      )
    }
  })
  editorSession.on('change', () => {
    addClosingCurlyBracket(editor, editorSession)
    handleCodeChange({
      target: {
        name: codeTargetName,
        value: `${
          codeHasAddedBehavior
            ? excludeCodePromptInStretchAnswer(
                editorSession,
                editor,
                endBarrierRegEx,
                startBarrierData
              )
            : editorSession.getValue()
        }`
      }
    })
    if (['authorSolution', 'studentAnswerRun'].includes(codeTargetName)) {
      changeCodeToRun(editorSession.getValue())
    }
    if (language === 'jsx' && jsxBarriers) {
      checkIfDeletingLineBetweenTwoReadOnlyLines(
        editor,
        editorSession,
        jsxBarriers.regExToCheck.render,
        jsxBarriers.regExToCheck.querySelector
      )
    }
    if (language === 'javascript') {
      checkIfDeletingLineBetweenTwoReadOnlyLines(
        editor,
        editorSession,
        startBarrierData.lastLine,
        endBarrierRegEx
      )
    }
  })
}

export default configEditor
