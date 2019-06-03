import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  }
}))

function StretchListView(props) {
  const classes = useStyles()
  function createOpenStretchData(title, categoryName, difficulty) {
    return { title, categoryName, difficulty }
  }
  function createSubmittedStretchData(title, isSolved, rating) {
    return { title, isSolved, rating }
  }

  const rows = []
  if (props.openStretches) {
    for (let i = 0; i < props.openStretches.length; ++i) {
      rows.push(
        createOpenStretchData(
          props.openStretches[i].title,
          props.openStretches[i].categoryName,
          props.openStretches[i].difficulty
        )
      )
    }
  } else {
    for (let i = 0; i < props.submittedStretches.length; ++i) {
      rows.push(
        createSubmittedStretchData(
          props.submittedStretches[i].title,
          props.submittedStretches[i].isSolved,
          props.submittedStretches[i].rating
        )
      )
    }
  }
  return (
    <Paper className={classes.root}>
      {props.openStretches ? (
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Difficulty</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, indx) => (
              <TableRow key={indx}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.categoryName}</TableCell>
                <TableCell align="right">{row.difficulty}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, indx) => (
              <TableRow key={indx}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">
                  {row.isSolved ? 'submitted' : 'not submitted'}
                </TableCell>
                <TableCell align="right">{row.rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  )
}

export default StretchListView
