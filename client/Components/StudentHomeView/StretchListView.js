import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import moment from 'moment'

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

function StretchListView({ stretches, status }) {
  const classes = useStyles()

  const tableColumnNames = {
    open: ['Title', 'Category', 'Cohort'],
    submitted: ['Title', 'Date', 'Category', 'Cohort'],
    missed: ['Title', 'Date', 'Category', 'Cohort']
  }
  const dbColumnNames = {
    open: ['title', 'categoryName', 'cohortName'],
    submitted: ['title', 'startTimer', 'categoryName', 'cohortName'],
    missed: ['title', 'startTimer', 'categoryName', 'cohortName']
  }
  const links = {
    open: { start: '/student/stretch/', idField: 'cohortStretchId' },
    submitted: { start: '/student/stretchAnswer/', idField: 'stretchAnswerId' },
    missed: { start: '/student/stretch/', idField: 'cohortStretchId' }
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {tableColumnNames[status].map((column, index) => {
              return (
                <TableCell key={index} align={index === 0 ? '' : 'right'}>
                  {column}
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {stretches.map((s, idx) => {
            return (
              <TableRow key={idx}>
                {dbColumnNames[status].map((field, idx) => {
                  const { start, idField } = links[status]
                  if (idx === 0) {
                    return (
                      <TableCell component="th" scope="row">
                        <Link to={`${start}${s[idField]}`}>{s[field]}</Link>
                      </TableCell>
                    )
                  }
                  return (
                    <TableCell key={idx} align="right">
                      {field !== 'startTimer'
                        ? s[field]
                        : moment
                            .utc(s[field])
                            .local()
                            .format('LL')}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default StretchListView

/* function createOpenStretchData(
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
  }*/
