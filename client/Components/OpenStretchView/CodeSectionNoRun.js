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

  const startBarrierString = `${codePrompt}\n\n// Write your answer below this line --------------------------------\n`
  const startBarrierData = {
    length: startBarrierString.length,
    numberOfLines: startBarrierString.split('\n').length - 2
  }
  const endBarrierString = `// Write your answer above this line-----------------\n `
  const endBarrierRegEx = /\/\/ Write your answer above this line-----------------/
  const solutionAnnonated = `${startBarrierString}\n${endBarrierString}`
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
          initialCode={solutionAnnonated}
          handleCodeChange={({ target }) => setStretchAnswer(target.value)}
          {...{ language, editorTheme, startBarrierData, endBarrierRegEx }}
        />
      </Grid>
    </Grid>
  )
}

const mapStateToProps = ({ stretches }, { stretchId }) => ({
  stretch: stretches.find(s => s.id === stretchId)
})

export default connect(mapStateToProps)(CodeSectionNoRun)
