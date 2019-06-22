import React from 'react'
import { Link } from 'react-router-dom'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import moment from 'moment'

const SingleTable = ({ data, dbColumnNames, tableColumnNames }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {tableColumnNames.map((column, index) => {
            if (column !== '') {
              return (
                <TableCell key={index}>
                  {/*} <TableSortLabel
                  direction={orderDirection}
                  active={orderColumn === column}
                  onClick={() => onRequestSort(dbColumnNames[status][index])}
            >*/}{' '}
                  {column}
                  {/* </TableSortLabel>*/}
                </TableCell>
              )
            }
            return <TableCell key={index} />
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item, idx) => {
          return (
            <TableRow key={idx}>
              {dbColumnNames.map((field, idx) => {
                if (idx === 0) {
                  return (
                    <TableCell key={idx} component="th" scope="row">
                      <Link to={`/admin/singleStretch/${item.stretchId}`}>
                        {item[field]}
                      </Link>
                    </TableCell>
                  )
                }
                return (
                  <TableCell key={idx} align="right">
                    {['startTimer', 'scheduledDate'].includes(field) &&
                      moment
                        .utc(item[field])
                        .local()
                        .format('LL')}

                    {!['startTimer', 'scheduledDate'].includes(field) &&
                      item[field]}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default SingleTable
