import React, { Fragment } from 'react'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'

const ScheduledStretchButtons = ({
  handleopenStretchModalOpen,
  handleRescheduleModalOpen,
  handleunscheduleModalOpen,
  cohortStretch
}) => {
  return (
    <Fragment>
      <TableCell>
        <Button onClick={() => handleopenStretchModalOpen(cohortStretch)}>
          {' '}
          Open{' '}
        </Button>
      </TableCell>
      <TableCell>
        <Button
          color="primary"
          onClick={() => handleRescheduleModalOpen(cohortStretch)}
        >
          {' '}
          Reschedule{' '}
        </Button>
      </TableCell>
      <TableCell>
        <Button
          color="secondary"
          onClick={() => handleunscheduleModalOpen(cohortStretch.id)}
        >
          {' '}
          Unschedule{' '}
        </Button>
      </TableCell>
    </Fragment>
  )
}

export default ScheduledStretchButtons
