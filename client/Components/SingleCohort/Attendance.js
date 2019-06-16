import React from 'react'

import { connect } from 'react-redux'

import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import Button from '@material-ui/core/Button'

const Attendance = props => {
  const { students } = props

  return (
    <Table>
      <EnhancedTableHead />

      <TableBody>
        {students.map(s => (
          <StudentRow key={s.id} attributes={s} />
        ))}
      </TableBody>
    </Table>
  )
}

const EnhancedTableHead = props => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Student Name</TableCell>
        <TableCell>Present/Absent</TableCell>
        <TableCell>Excused/Unexcused</TableCell>
        <TableCell>Edit</TableCell>
      </TableRow>
    </TableHead>
  )
}

const StudentRow = props => {
  const { attributes } = props
  const { firstName, lastName, attendance } = attributes

  return (
    <TableRow>
      <TableCell>
        {firstName} {lastName}
      </TableCell>

      <TableCell>
        {attendance ? (
          `${attendance.isPresent ? 'Present' : 'Absent'}`
        ) : (
          <em>No record found</em>
        )}
      </TableCell>

      <TableCell>
        {attendance ? (
          `${
            attendance.isPresent
              ? ''
              : `${attendance.isExcused ? 'Excused' : 'Unexcused'}`
          }`
        ) : (
          <em>No record found</em>
        )}
      </TableCell>

      <TableCell>
        <Button>Edit</Button>
      </TableCell>
    </TableRow>
  )
}

const mapStateToProps = (state, props) => {
  const { users, cohorts } = state
  const { cohortId, records } = props

  const students = users
    .filter(s => !s.isAdmin && s.cohortIds.find(id => id === cohortId))
    .map(s => {
      return { ...s, attendance: records[s.id] }
    })

  return { students }
}

export default connect(mapStateToProps)(Attendance)
