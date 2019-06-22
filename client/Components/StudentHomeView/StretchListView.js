import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import moment from 'moment'
import { sortData } from '../../utilityfunctions'
import SortedTableHead from '../_shared/SortedTableHead'

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
  let stretchesSorted = stretches
  if (orderColumn) {
    stretchesSorted = sortData(stretchesSorted, orderColumn, orderDirection)
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
        <SortedTableHead
          columns={tableColumnNames[status].map((name, index) => ({
            displayName: name,
            dataName: dbColumnNames[status][index]
          }))}
          align="right"
          {...{
            setOrderDirection,
            orderDirection,
            setOrderColumn,
            orderColumn
          }}
        />
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
