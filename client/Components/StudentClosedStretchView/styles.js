import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => {
  return {
    textColor: {
      color: theme.palette.primary.main
    },
    topDivider: {
      marginTop: '25px',
      marginBottom: '10px'
    },
    inlineDivider: {
      marginTop: '10px'
    },
    addComment: {
      width: '80%'
    },
    timeClass: {
      marginLeft: '10px',
      color: 'lightgrey'
    },
    singleComment: {
      fontSize: '.83rem'
    },
    dateAsStringStyle: {
      marginLeft: '5px',
      marginRight: '5px',
      textAlign: 'center'
    }
  }
})

export default useStyles
