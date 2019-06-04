import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import {
  codeOutputStyles,
  codeOutputAndButtonsStyles,
  buttonsStyles
} from './styles'

const useStyles = makeStyles(() => {
  return {
    errorColor: {
      color: 'red'
    }
  }
})

const OutputAndButtons = ({
  showRunButton,
  runCode,
  codeResponse,
  clearCodeResults,
  codeError,
  saveButtonText,
  saveCodeToDatabase
}) => {
  const { errorColor } = useStyles()
  return (
    <Grid container style={codeOutputAndButtonsStyles.root}>
      <Grid item xs={3} style={buttonsStyles.root}>
        <Grid container>
          <Grid item xs={12}>
            {saveButtonText && (
              <Button
                variant="contained"
                color="primary"
                type="button"
                size="small"
                onClick={saveCodeToDatabase}
                style={buttonsStyles.singleButton}
              >
                {saveButtonText}
              </Button>
            )}
          </Grid>
          <Grid item xs={12}>
            {showRunButton && (
              <Button
                variant="contained"
                color="primary"
                type="button"
                size="small"
                onClick={runCode}
                style={buttonsStyles.singleButton}
              >
                Run Code
              </Button>
            )}
          </Grid>
          <Grid item xs={12}>
            {showRunButton && (
              <Button
                variant="contained"
                type="button"
                size="small"
                onClick={clearCodeResults}
              >
                Clear Results
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={7}>
        <Box style={codeOutputStyles.root}>
          {codeResponse &&
            codeResponse.split('\n').map((el, index) => (
              <Typography key={index} component="p">
                {el}
              </Typography>
            ))}

          {codeError && (
            <Typography component="p" className={errorColor}>
              {codeError}
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  )
}

export default OutputAndButtons
