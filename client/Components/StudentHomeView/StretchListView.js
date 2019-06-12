import React from 'react'
import { Link } from 'react-router-dom'
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
  function createOpenStretchData(
    cohortStretchId,
    title,
    categoryName,
    difficulty
  ) {
    return { cohortStretchId, title, categoryName, difficulty }
  }
  function createSubmittedStretchData(
    stretchAnswerId,
    title,
    cohortName,
    rating,
    stretchId
  ) {
    return { stretchAnswerId, title, cohortName, rating, stretchId }
  }

  const rows = []
  if (props.openStretches) {
    for (let i = 0; i < props.openStretches.length; ++i) {
      rows.push(
        createOpenStretchData(
          props.openStretches[i].cohortStretchId,
          props.openStretches[i].title,
          props.openStretches[i].categoryName,
          props.openStretches[i].difficulty
        )
      )
    }
  } else if (props.submittedStretches) {
    for (let i = 0; i < props.submittedStretches.length; ++i) {
      rows.push(
        createSubmittedStretchData(
          props.submittedStretches[i].id,
          props.submittedStretches[i].title,
          props.submittedStretches[i].cohortName,
          props.submittedStretches[i].rating,
          props.submittedStretches[i].stretchId
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
                  <Link to={`/student/stretch/${row.cohortStretchId}`}>
                    {row.title}
                  </Link>
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
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">Cohort</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, indx) => (
              <TableRow key={indx}>
                <TableCell component="th" scope="row">
                  <Link to={`/student/stretchAnswer/${row.stretchAnswerId}`}>
                    {row.title}
                  </Link>
                </TableCell>

                <TableCell align="right">{row.rating}</TableCell>
                <TableCell align="right">{row.cohortName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  )
}

export default StretchListView
