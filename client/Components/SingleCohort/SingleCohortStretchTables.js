import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAllCohortStretches } from '../../store/cohort-stretches/actions'
import { Link } from 'react-router-dom'

import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const SingleCohortStretchTables = ({ cohort, cohortStretches, stretches }) => {
  const thisCohortStretches =
    cohortStretches.filter(
      cohortStretch => cohortStretch.cohortId === cohort.id
    ) || []
  const openCohortStretches =
    thisCohortStretches.filter(
      cohortStretches => cohortStretches.status === 'open'
    ) || []
  const closedCohortStretches =
    thisCohortStretches
      .filter(cohortStretches => cohortStretches.status === 'closed')
      .map(cs => ({
        ...cs,
        stretch: stretches.find(s => s.id === cs.stretchId)
      })) || []
  const scheduledCohortStretches =
    thisCohortStretches.filter(
      cohortStretches => cohortStretches.status === 'scheduled'
    ) || []

  const openCohortStretchIds = openCohortStretches.map(
    stretch => stretch.stretchId
  )
  const scheduledCohortStretchIds = scheduledCohortStretches.map(
    stretch => stretch.stretchId
  )

  const openStretches = stretches.filter(stretch =>
    openCohortStretchIds.includes(stretch.id)
  )
  ////const closedStretches = stretches.filter(stretch =>
  //  closedCohortStretchIds.includes(stretch.id)
  //)
  const scheduledStretches = stretches.filter(stretch =>
    scheduledCohortStretchIds.includes(stretch.id)
  )

  return (
    <div>
      <Typography variant="h6" id="tableTitle">
        Open Stretches
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Difficulty</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {openStretches.map(stretch => {
            return (
              <TableRow key={stretch.id}>
                <TableCell>
                  <Link to={`/admin/singleStretch/${stretch.id}`}>
                    {stretch.title}
                  </Link>
                </TableCell>
                <TableCell>{stretch.authorName}</TableCell>
                <TableCell>{stretch.categoryName}</TableCell>
                <TableCell>{stretch.difficulty}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <Typography variant="h6" id="tableTitle">
        Scheduled Stretches
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Difficulty</TableCell>
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {scheduledStretches.map(stretch => {
            return (
              <TableRow key={stretch.id}>
                <TableCell>
                  <Link to={`/admin/singleStretch/${stretch.id}`}>
                    {stretch.title}
                  </Link>
                </TableCell>
                <TableCell>{stretch.authorName}</TableCell>
                <TableCell>{stretch.categoryName}</TableCell>
                <TableCell>{stretch.difficulty}</TableCell>
                <TableCell>
                  <Link to="/">
                    <Button color="primary"> Reschedule </Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link to="/">
                    <Button color="secondary"> Unschedule </Button>
                  </Link>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <Typography variant="h6" id="tableTitle">
        Closed Stretches
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Difficulty</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {closedCohortStretches.map(cs => {
            const { id, stretch } = cs
            return (
              <TableRow key={id}>
                <TableCell>
                  <Link to={`/admin/singleStretch/${stretch.id}`}>
                    {stretch.title}
                  </Link>
                </TableCell>
                <TableCell>{stretch.authorName}</TableCell>
                <TableCell>{stretch.categoryName}</TableCell>
                <TableCell>{stretch.difficulty}</TableCell>
                <TableCell>
                  <Link to="/">
                    <Button color="primary"> View Analytics </Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link to={`/admin/stretchReview/${id}`}>
                    <Button>Go To Classroom</Button>
                  </Link>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

const mapStateToProps = ({ cohortStretches, stretches }) => ({
  cohortStretches,
  stretches
})

export default connect(mapStateToProps)(SingleCohortStretchTables)
