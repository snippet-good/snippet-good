import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => {
  const color = theme.palette.primary.main
  return {
    textPromptSpacing: {
      width: '80%',
      margin: '0 auto'
    },
    textPromptHeading: {
      textAlign: 'center',
      marginTop: '20px',
      color,
      fontSize: '1rem'
    }
  }
})

export default useStyles
