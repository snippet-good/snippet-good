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

const checkIfDeletingLineBetweenTwoReadOnlyLines = (
  editor,
  editorSession,
  readOnlyLinesRegEx
) => {
  const cursorRow = editor.getCursorPosition().row
  const codeSplitByLine = editorSession.getValue().split('\n')
  let linesReadOnlyCount = 0
  // eslint-disable-next-line guard-for-in
  for (let key in readOnlyLinesRegEx) {
    const currentLineReadOnlyForCurrentRegEx =
      codeSplitByLine[cursorRow].search(readOnlyLinesRegEx[key]) >= 0
    if (
      cursorRow === codeSplitByLine.length - 1 &&
      currentLineReadOnlyForCurrentRegEx
    ) {
      editorSession.insert({ row: cursorRow + 1, column: 0 }, '\n')
      return
    } else if (cursorRow < codeSplitByLine.length - 1) {
      const nextLineReadOnlyForCurrentRegEx =
        codeSplitByLine[cursorRow + 1].search(readOnlyLinesRegEx[key]) >= 0
      if (
        currentLineReadOnlyForCurrentRegEx ||
        nextLineReadOnlyForCurrentRegEx
      ) {
        ++linesReadOnlyCount
      }
    }
    if (linesReadOnlyCount === 2) {
      editorSession.insert({ row: cursorRow + 1, column: 0 }, '\n')
      return
    }
  }
}

const splitAndSetCodePromptAndSolutionOnState = (
  editorSession,
  { codePrompt, solutionStart, solutionEnd },
  handleCodeChange
) => {
  const codeSplitByLine = editorSession.getValue().split('\n')
  const correspondingLineNumbers = {}
  for (let i = 0; i < codeSplitByLine.length; ++i) {
    if (codeSplitByLine[i].search(codePrompt) >= 0)
      correspondingLineNumbers.codePrompt = i
    if (codeSplitByLine[i].search(solutionStart) >= 0)
      correspondingLineNumbers.solutionStart = i
    if (codeSplitByLine[i].search(solutionEnd) >= 0)
      correspondingLineNumbers.solutionEnd = i
  }
  handleCodeChange({
    target: {
      name: 'codePrompt',
      value: codeSplitByLine
        .slice(
          correspondingLineNumbers.codePrompt + 1,
          correspondingLineNumbers.solutionStart
        )
        .join('')
    }
  })
  handleCodeChange({
    target: {
      name: 'authorSolution',
      value: codeSplitByLine
        .slice(
          correspondingLineNumbers.solutionStart + 1,
          correspondingLineNumbers.solutionEnd
        )
        .join('')
    }
  })
}

const getStudentAnswerPortion = (
  editorSession,
  { solutionStart, solutionEnd }
) => {
  const codeSplitByLine = editorSession.getValue().split('\n')
  const codeSplitWithLineNumber = codeSplitByLine.map((el, idx) => ({
    code: el,
    lineNumber: idx
  }))
  let answerLineNumberEnd
  const answerLineNumberStart =
    codeSplitWithLineNumber.find(
      element => element.code.search(solutionStart) >= 0
    ).lineNumber + 1
  if (solutionEnd) {
    answerLineNumberEnd = codeSplitWithLineNumber.find(
      element => element.code.search(solutionEnd) >= 0
    ).lineNumber
  }
  return codeSplitByLine
    .slice(
      answerLineNumberStart,
      solutionEnd ? answerLineNumberEnd : codeSplitByLine.length
    )
    .join('')
}

const checkIfCursorInCodePrompt = (readOnlyLinesRegEx, editor, currentCode) => {
  let lastLineCodePrompt = 0
  for (let i = 0; i < currentCode.length; ++i) {
    if (currentCode[i].search(readOnlyLinesRegEx.solutionStart) >= 0) {
      lastLineCodePrompt = i
      break
    }
  }
  if (editor.getCursorPosition().row <= lastLineCodePrompt)
    editor.setReadOnly(true)
}

const checkIfCurentLineReadOnly = (currentLine, readOnlyLinesRegEx, editor) => {
  for (let key in readOnlyLinesRegEx) {
    if (currentLine.search(readOnlyLinesRegEx[key]) >= 0) {
      editor.setReadOnly(true)
      return
    }
  }
}

const configEditor = function(
  editor,
  { editorSession, selection },
  userOptions,
  { handleCodeChange, changeCodeToRun },
  codeTargetName
) {
  const {
    initialCode,
    editorTheme,
    language,
    readOnly,
    readOnlyLinesRegEx
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
    if (codeTargetName === 'readStretch') return
    editor.setReadOnly(false)
    const currentCode = editorSession.getValue()
    const currentLine = currentCode.split('\n')[editor.getCursorPosition().row]
    if (
      typeof readOnlyLinesRegEx === 'object' &&
      readOnlyLinesRegEx !== null &&
      Object.keys(readOnlyLinesRegEx).length
    ) {
      if (
        codeTargetName.startsWith('studentAnswer') ||
        codeTargetName === 'cohortStretchCreation'
      ) {
        checkIfCursorInCodePrompt(
          readOnlyLinesRegEx,
          editor,
          currentCode.split('\n')
        )
      }
      if (codeTargetName !== 'studentAnswerNoRun') {
        checkIfCurentLineReadOnly(currentLine, readOnlyLinesRegEx, editor)
      }
    }
  })
  editorSession.on('change', () => {
    if (codeTargetName === 'readStretch') return
    addClosingCurlyBracket(editor, editorSession)
    if (codeTargetName === 'createStretch') {
      splitAndSetCodePromptAndSolutionOnState(
        editorSession,
        readOnlyLinesRegEx,
        handleCodeChange
      )
    }

    handleCodeChange({
      target: {
        name: codeTargetName,
        value: `${
          codeTargetName.startsWith('studentAnswer') ||
          codeTargetName === 'cohortStretchCreation'
            ? getStudentAnswerPortion(editorSession, readOnlyLinesRegEx)
            : editorSession.getValue()
        }`
      }
    })
    if (
      [
        'authorSolution',
        'studentAnswerRun',
        'createStretch',
        'cohortStretchCreation'
      ].includes(codeTargetName)
    ) {
      changeCodeToRun(editorSession.getValue())
    }
    checkIfDeletingLineBetweenTwoReadOnlyLines(
      editor,
      editorSession,
      readOnlyLinesRegEx
    )
  })
}

export default configEditor
