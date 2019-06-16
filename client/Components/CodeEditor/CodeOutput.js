import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const styles = {
  root: {
    border: '1px lightgray solid',
    paddingLeft: '10px'
  }
}

const CodeOutput = ({ codeResponse, codeError, minHeight }) => {
  return (
    <Box style={{ ...styles.root, minHeight }}>
      {codeResponse &&
        codeResponse.split('\n').map((el, index) => (
          <Typography key={index} component="p">
            {el}
          </Typography>
        ))}

      {codeError && (
        <Typography component="p" color="error">
          {codeError}
        </Typography>
      )}
    </Box>
  )
}

export default CodeOutput
