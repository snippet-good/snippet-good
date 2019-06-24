import React from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'

const SortedTableHead = ({
  columns,
  align,
  setOrderDirection,
  orderDirection,
  setOrderColumn,
  orderColumn
}) => {
  const onRequestSort = column => {
    setOrderColumn(column)
    setOrderDirection(orderDirection === 'desc' ? 'asc' : 'desc')
  }
  return (
    <TableHead>
      <TableRow>
        {columns.map(({ displayName, dataName }, index) => {
          if (displayName === '') {
            return (
              <TableCell
                key={index}
                align={index === 0 ? 'inherit' : align || 'inherit'}
              />
            )
          }

          return (
            <TableCell
              key={index}
              align={index === 0 ? 'inherit' : align || 'inherit'}
            >
              <TableSortLabel
                direction={orderDirection}
                active={orderColumn === dataName}
                onClick={() => onRequestSort(dataName)}
              >
                {' '}
                {displayName}
              </TableSortLabel>
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  )
}

export default SortedTableHead
