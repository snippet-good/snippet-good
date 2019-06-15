import React, { useState } from 'react'
import CodeEditor, { AuxillaryComponents } from '../CodeEditor'
const { ThemeSelector } = AuxillaryComponents
import Grid from '@material-ui/core/Grid'

const CodeSectionNoRun = ({ codePrompt, setStretchAnswer }) => {
  const [editorTheme, setEditorTheme] = useState('monokai')
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
          codeTargetName="code"
          initialCode={codePrompt}
          editorTheme={editorTheme}
          handleCodeChange={({ target }) => setStretchAnswer(target.value)}
        />
      </Grid>
    </Grid>
  )
}

export default CodeSectionNoRun
