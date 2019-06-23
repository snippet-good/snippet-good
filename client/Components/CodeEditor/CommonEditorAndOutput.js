import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CodeEditor from './CodeEditor'
import CodeOutput from './CodeOutput'
import { codeSectionStyles } from './styles'

const CommonEditorAndOutput = props => {
  const {
    codeTargetName,
    language,
    initialCode,
    editorTheme,
    fileName,
    fileGenerated,
    codeResponse,
    codeError,
    handleCodeChange,
    onUnmount,
    endBarrierRegEx,
    startBarrierData,
    changeCodeToRun,
    jsxBarriers
  } = props
  return (
    <Grid container>
      <Grid item xs={6}>
        <CodeEditor
          {...{
            codeTargetName,
            initialCode,
            editorTheme,
            handleCodeChange,
            changeCodeToRun,
            language,
            onUnmount,
            endBarrierRegEx,
            startBarrierData,
            jsxBarriers
          }}
        />
      </Grid>
      <Grid item xs={6}>
        {language === 'jsx' && (
          <Typography
            variant="subtitle2"
            style={codeSectionStyles.outputLabels}
          >
            JSX Rendering
          </Typography>
        )}

        {language === 'jsx' && (
          <iframe
            src={fileGenerated ? fileName : ''}
            style={codeSectionStyles.iframe}
          />
        )}
        {language === 'jsx' && (
          <Typography
            variant="subtitle2"
            style={codeSectionStyles.outputLabels}
          >
            Console
          </Typography>
        )}
        <CodeOutput
          codeResponse={codeResponse}
          codeError={codeError}
          minHeight={`${language === 'jsx' ? '10' : '23'}rem`}
        />
      </Grid>
    </Grid>
  )
}

export default CommonEditorAndOutput
