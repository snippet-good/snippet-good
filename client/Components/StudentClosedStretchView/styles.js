import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => {
  const color = theme.palette.primary.main
  return {
    textColor: {
      color
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
    },
    textPromptSpacing: {
      width: '80%',
      margin: '0 auto'
    },
    textPromptHeading: {
      textAlign: 'center',
      marginTop: '20px',
      color,
      fontSize: '1rem'
    },
    bottomMargin: {
      marginBottom: '15px',
      fontSize: '1rem'
    }
  }
})

const editorsStyles = () => {
  const select = {
    width: '15%',
    marginTop: '3px'
  }
  return {
    center: {
      textAlign: 'center',
      marginTop: '10px'
    },
    select,
    solutionSelect: { ...select, marginLeft: '20px' },
    root: {
      marginTop: '10px'
    }
  }
}

const buttonsStyles = {
  singleButton: {
    marginBottom: '10px'
  }
}

export { useStyles, editorsStyles, buttonsStyles }
