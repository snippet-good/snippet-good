import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableSortLabel from '@material-ui/core/TableSortLabel'
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
  let [orderDirection, setOrderDirection] = useState('desc')
  let [orderColumn, setOrderColumn] = useState('')
  const onRequestSort = column => {
    setOrderColumn(column)
    setOrderDirection(orderDirection === 'desc' ? 'asc' : 'desc')
  }

  let stretchesSorted = stretches
  if (orderColumn) {
    stretchesSorted = stretchesSorted.sort((a, b) => {
      if (a[orderColumn] < b[orderColumn])
        return orderDirection === 'desc' ? 1 : -1
      if (a[orderColumn] > b[orderColumn])
        return orderDirection === 'desc' ? -1 : 1
      return 0
    })
  }

  const tableColumnNames = {
    open: ['Title', 'Category', 'Cohort'],
    submitted: [
      'Title',
      'Date Stretch Opened',
      'Category',
      'Cohort',
      'Submitted On Time'
    ],
    missed: ['Title', 'Date Stretch Opened', 'Category', 'Cohort']
  }
  const dbColumnNames = {
    open: ['title', 'categoryName', 'cohortName'],
    submitted: [
      'title',
      'startTimer',
      'categoryName',
      'cohortName',
      'submittedOnTime'
    ],
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
                <TableCell
                  key={index}
                  align={index === 0 ? 'inherit' : 'right'}
                >
                  <TableSortLabel
                    direction={orderDirection}
                    active={orderColumn === column}
                    onClick={() => onRequestSort(dbColumnNames[status][index])}
                  >
                    {' '}
                    {column}
                  </TableSortLabel>
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {stretchesSorted.map((s, idx) => {
            return (
              <TableRow key={idx}>
                {dbColumnNames[status].map((field, idx) => {
                  const { start, idField } = links[status]
                  if (idx === 0) {
                    return (
                      <TableCell key={idx} component="th" scope="row">
                        <Link to={`${start}${s[idField]}`}>{s[field]}</Link>
                      </TableCell>
                    )
                  }
                  return (
                    <TableCell key={idx} align="right">
                      {field === 'startTimer' &&
                        moment
                          .utc(s[field])
                          .local()
                          .format('LL')}
                      {field === 'submittedOnTime' && (
                        <i
                          className={`far fa-${s[field] ? 'smile' : 'frown'}`}
                        />
                      )}
                      {!['startTimer', 'submittedOnTime'].includes(field) &&
                        s[field]}
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
