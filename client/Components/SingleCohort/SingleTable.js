import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import moment from 'moment'
import { deleteCohortStretchThunk } from '../../store/cohort-stretches/actions'
import { openStretchProcessThunk } from '../../store/shared-actions'
import { connect } from 'react-redux'

import StretchScheduler from '../_shared/StretchScheduler'
import ConfirmDialogBox from '../_shared/ConfirmDialogBox'
import ScheduledStretchButtons from './ScheduledStretchButtons'
import ClosedStretchLinks from './ClosedStretchLinks'
import SortedTableHead from '../_shared/SortedTableHead'
import { sortData } from '../../utilityfunctions'

const SingleTable = ({
  data,
  dbColumnNames,
  tableColumnNames,
  status,
  openStretchProcess,
  deleteCohortStretch,
  stretches
}) => {
  let [rescheduleModalOpen, setRescheduleModalOpen] = useState(false)
  let [unscheduleModalOpen, setunscheduleModalOpen] = useState(false)
  let [openStretchModalOpen, setOpenStretchModalOpen] = useState(false)
  let [selectedCohortStretch, setCohortStretch] = useState({})
  let [orderDirection, setOrderDirection] = useState('desc')
  let [orderColumn, setOrderColumn] = useState('')

  // StretchScheduler modal event handlers
  const handleRescheduleModalClose = () => setRescheduleModalOpen(false)
  const handleRescheduleModalOpen = selectedCohortStretch => {
    setRescheduleModalOpen(true)
    setCohortStretch({
      ...selectedCohortStretch,
      id: selectedCohortStretch.cohortStretchId
    })
  }

  // Unschedule modal event handlers
  const handleunscheduleModalClose = () => setunscheduleModalOpen(false)
  const handleunscheduleModalOpen = cohortStretch => {
    setunscheduleModalOpen(true)
    setCohortStretch(cohortStretch)
  }

  // open stretch modal event handlers
  const handleopenStretchModalClose = () => setOpenStretchModalOpen(false)
  const handleopenStretchModalOpen = cohortStretch => {
    setOpenStretchModalOpen(true)
    setCohortStretch(cohortStretch)
  }

  let dataDisplay =
    orderColumn === '' ? data : sortData(data, orderColumn, orderDirection)
  return (
    <div>
      <StretchScheduler
        open={rescheduleModalOpen}
        onClose={handleRescheduleModalClose}
        attributes={selectedCohortStretch}
        mode="update"
      />
      <ConfirmDialogBox
        text="Are you sure you would like to unschedule the stretch?"
        open={unscheduleModalOpen}
        setModalClosed={handleunscheduleModalClose}
        args={[selectedCohortStretch.cohortStretchId]}
        action={deleteCohortStretch}
        showNoButton={true}
      />
      <ConfirmDialogBox
        text="Are you sure you would like to open the stretch?"
        open={openStretchModalOpen}
        setModalClosed={handleopenStretchModalClose}
        args={[
          stretches.find(s => s.id === selectedCohortStretch.stretchId),
          selectedCohortStretch.cohortStretchId,
          { status: 'open', startTimer: new Date() }
        ]}
        action={openStretchProcess}
        showNoButton={true}
      />
      <Table>
        <SortedTableHead
          columns={tableColumnNames.map((name, index) => ({
            displayName: name,
            dataName: dbColumnNames[index]
          }))}
          {...{
            setOrderDirection,
            orderDirection,
            setOrderColumn,
            orderColumn
          }}
        />
        <TableBody>
          {dataDisplay.map((item, idx) => {
            return (
              <TableRow key={idx}>
                {dbColumnNames.map((field, idx) => {
                  if (idx === 0) {
                    return (
                      <TableCell key={idx}>
                        <Link to={`/admin/singleStretch/${item.stretchId}`}>
                          {item[field]}
                        </Link>
                      </TableCell>
                    )
                  }
                  return (
                    <TableCell key={idx}>
                      {['startTimer', 'scheduledDate'].includes(field) &&
                        moment
                          .utc(item[field])
                          .local()
                          .format('LLL')}

                      {!['startTimer', 'scheduledDate'].includes(field) &&
                        item[field]}
                    </TableCell>
                  )
                })}
                {status === 'scheduled' && (
                  <ScheduledStretchButtons
                    cohortStretch={item}
                    {...{
                      handleRescheduleModalOpen,
                      handleopenStretchModalOpen,
                      handleunscheduleModalOpen
                    }}
                  />
                )}
                {status === 'closed' && (
                  <ClosedStretchLinks
                    cohortStretchId={item.cohortStretchId}
                    stretchId={item.stretchId}
                  />
                )}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    deleteCohortStretch: id => dispatch(deleteCohortStretchThunk(id)),
    openStretchProcess: (stretch, cohortStretchId, updatedFields) =>
      dispatch(openStretchProcessThunk(stretch, cohortStretchId, updatedFields))
  }
}

export default connect(
  ({ stretches }) => ({ stretches }),
  mapDispatchToProps
)(SingleTable)
