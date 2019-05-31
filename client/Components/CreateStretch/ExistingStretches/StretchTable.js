import React from 'react'
import { connect } from 'react-redux'

import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const StretchTable = props => {
  if (!props.stretches) return null
  const { stretches } = props
  console.log(stretches)
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Author</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {stretches.map(s => (
          <TableRow key={s.id}>
            <TableCell>{s.title}</TableCell>
            <TableCell>{s.categoryName}</TableCell>
            <TableCell>{s.authorName}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const mapStateToProps = ({ stretches }) => ({ stretches })

export default connect(mapStateToProps)(StretchTable)
