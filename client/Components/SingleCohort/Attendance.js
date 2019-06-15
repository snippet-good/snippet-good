import React from 'react'

import { connect } from 'react-redux'

import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

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
  const { firstName, lastName } = props.attributes

  return (
    <TableRow>
      <TableCell>
        {firstName} {lastName}
      </TableCell>

      <TableCell />
    </TableRow>
  )
}

const mapStateToProps = (state, props) => {
  const { users, cohorts } = state
  const { cohortId } = props

  const students = users.filter(
    s => !s.isAdmin && s.cohortIds.find(id => id === cohortId)
  )

  return { students }
}

export default connect(mapStateToProps)(Attendance)
