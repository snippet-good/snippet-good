import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
  return {
    errorColor: {
      color: 'red'
    }
  }
})

const CodeOutput = ({ codeResponse, codeError }) => {
  const { errorColor } = useStyles()
  return (
    <Box>
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
  )
}

export default CodeOutput
