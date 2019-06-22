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
  handleCodeChange,
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
    const currentCode = /* initialCode ||*/ editorSession.getValue()
    if (editor.getCursorPosition().row <= this.state.firstLineCanEdit) {
      editor.setReadOnly(true)
    } else {
      editor.setReadOnly(false)
    }

    if (codeTargetName === 'authorSolution' && currentCode) {
      console.log('current code split', currentCode.split('\n'))
      console.log('my cursor positon', editor.getCursorPosition().row)
      const rg = currentCode.split('\n')[editor.getCursorPosition().row]
      console.log('rg', rg)
      if (
        rg &&
        rg.search('Write the solution above this line-----------------') >= 0
      ) {
        editor.setReadOnly(true)
      }
      /*currentCode.split('\n').forEach((row, idx) => {
        console.log('for loop')
        console.log(row)
        console.log(
          row.search('Write the solution above this line-----------------') >= 0
        )
        console.log(idx, editor.getCursorPosition().row)
        if (
          row.search(endBarrierRegEx) >= 0 &&
          idx === editor.getCursorPosition().row
        ) {
          editor.setReadOnly(true)
        }
      })*/
    }

    console.log('cursorposition', editor.getCursorPosition().row)
    console.log('irsliencanedit', this.state.firstLineCanEdit)

    this.setState({ cursorPosition: editor.getCursorPosition() }, () =>
      console.log(this.state)
    )
  })
  editorSession.on('change', () => {
    addClosingCurlyBracket(editor, editorSession)
    handleCodeChange({
      target: {
        name: codeTargetName,
        value: `${
          ['codeAnswer', 'authorSolution'].includes(codeTargetName)
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
  })
}

export default configEditor
