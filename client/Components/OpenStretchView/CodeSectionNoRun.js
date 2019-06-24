import React, { useState } from 'react'
import { connect } from 'react-redux'
import CodeEditor, { AuxillaryComponents } from '../CodeEditor'
const { ThemeSelector } = AuxillaryComponents
import Grid from '@material-ui/core/Grid'

const CodeSectionNoRun = ({
  setStretchAnswer,
  stretch: { language, codePrompt }
}) => {
  const [editorTheme, setEditorTheme] = useState('monokai')

  const readOnlyLinesRegEx = {
    solutionStart: /\/\/ Write your answer below this line --------------------------------/
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <ThemeSelector
          editorTheme={editorTheme}
          handleChange={({ target }) => setEditorTheme(target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <CodeEditor
          codeTargetName="studentAnswerNoRun"
          initialCode={`// Code Prompt\n\n${codePrompt}\n\n// Write your answer below this line --------------------------------\n`}
          handleCodeChange={({ target }) => setStretchAnswer(target.value)}
          {...{ language, editorTheme, readOnlyLinesRegEx }}
        />
      </Grid>
    </Grid>
  )
}

const mapStateToProps = ({ stretches }, { stretchId }) => ({
  stretch: stretches.find(s => s.id === stretchId)
})

export default connect(mapStateToProps)(CodeSectionNoRun)
