import React, { useState } from 'react'
import { connect } from 'react-redux'
import { checkIfAllDataExists } from '../../utilityfunctions'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import SingleTable from './SingleTable'
import { formatCohortStretch } from '../StudentHomeView/helperfunctions'

const SingleCohortStretchTables = ({ cohort, cohortStretches, stretches }) => {
  if (!checkIfAllDataExists(cohort, cohortStretches, stretches)) {
    return <div>No open, scheduled, or submitted stretches for cohort</div>
  }

  const thisCohortStretches =
    cohortStretches.filter(
      cohortStretch => cohortStretch.cohortId === cohort.id
    ) || []
  const openCohortStretches =
    thisCohortStretches
      .filter(cohortStretches => cohortStretches.status === 'open')
      .map(cs => formatCohortStretch(cs, stretches)) || []
  const closedCohortStretches =
    thisCohortStretches
      .filter(cohortStretches => cohortStretches.status === 'closed')
      .map(cs => formatCohortStretch(cs, stretches)) || []
  const scheduledCohortStretches =
    thisCohortStretches
      .filter(cohortStretches => cohortStretches.status === 'scheduled')
      .map(cs => formatCohortStretch(cs, stretches)) || []
  const groupedStretches = {
    open: openCohortStretches,
    scheduled: scheduledCohortStretches,
    closed: closedCohortStretches
  }

  const baseColumnNames = ['Title', 'Author', 'Category']
  const tableColumnNames = {
    open: [...baseColumnNames, 'Difficulty'],
    scheduled: [...baseColumnNames, 'Scheduled Date', '', '', ''],
    closed: [...baseColumnNames, 'Date Opened On', '', '']
  }
  const baseDBColumnNames = ['title', 'authorName', 'categoryName']
  const dbColumnNames = {
    open: [...baseDBColumnNames, 'difficulty'],
    scheduled: [...baseDBColumnNames, 'scheduledDate'],
    closed: [...baseDBColumnNames, 'startTimer']
  }
  const tables = [
    { title: 'Open Stretches', key: 'open' },
    { title: 'Scheduled Stretches', key: 'scheduled' },
    { title: 'Closed Stretches', key: 'closed' }
  ]

  return (
    <div>
      {tables.map(table => {
        let [expandedTable, setExpandTable] = useState(true)
        const { key, title } = table
        return (
          <div key={key}>
            <ListItem
              button
              onClick={() => {
                console.log(expandedTable)
                setExpandTable(!expandedTable)
              }}
            >
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="h6" id="tableTitle">
                    {title}
                  </Typography>
                </Grid>
                <Grid item xs={6} style={{ textAlign: 'right' }}>
                  {expandedTable ? <ExpandLess /> : <ExpandMore />}
                </Grid>
              </Grid>
            </ListItem>
            <Collapse in={expandedTable} timeout="auto" unmountOnExit>
              <SingleTable
                data={groupedStretches[key]}
                dbColumnNames={dbColumnNames[key]}
                tableColumnNames={tableColumnNames[key]}
                status={key}
              />
            </Collapse>
          </div>
        )
      })}
    </div>
  )
}

const mapStateToProps = ({ cohortStretches, stretches }) => ({
  cohortStretches,
  stretches
})

export default connect(mapStateToProps)(SingleCohortStretchTables)
