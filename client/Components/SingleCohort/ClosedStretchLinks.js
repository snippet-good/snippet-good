import React, { Fragment } from 'react'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

const ClosedStretchLinks = ({ cohortStretchId, stretchId }) => {
  return (
    <Fragment>
      <TableCell>
        <Link to={`/admin/stretch/analytics/${stretchId}`}>
          <Button color="primary"> View Analytics </Button>
        </Link>
      </TableCell>
      <TableCell>
        <Link to={`/admin/stretchReview/${cohortStretchId}`}>
          <Button>Go To Classroom</Button>
        </Link>
      </TableCell>
    </Fragment>
  )
}

export default ClosedStretchLinks
