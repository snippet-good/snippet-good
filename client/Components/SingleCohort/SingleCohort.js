import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { makeStyles } from '@material-ui/core/styles'
import SingleCohortStretchTables from './SingleCohortStretchTables'
import { getAllCohortUsers } from '../../store/cohort-users/actions'
import { CohortStudents } from './CohortStudents'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  }
}))

const SingleCohort = ({ cohort, cohortStudents, cohortUsers, users }) => {
  const { root } = useStyles()
  const { name } = cohort
  const [value, setValue] = useState('stretches')

  useEffect(() => {
    getAllCohortUsers()
  })

  return (
    <div className={root}>
      <Typography
        variant="h5"
        gutterBottom
        onClick={() => (modalStatus = true)}
      >
        {name}
      </Typography>

      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab value="stretches" label="Stretches" />
          <Tab value="students" label="Students" />
        </Tabs>
      </AppBar>
      {value === 'stretches' && <SingleCohortStretchTables cohort={cohort} />}
      {value === 'students' && (
        <CohortStudents cohortStudents={cohortStudents} />
      )}
    </div>
  )
}

const mapStateToProps = ({ cohorts, users }, { match: { params } }) => ({
  cohortStudents: users.filter(student =>
    student.cohortIds.includes(params.id)
  ),
  cohort: cohorts.find(cohort => cohort.id === params.id) || {}
})

const mapDispatchToProps = dispatch => {
  return {
    getAllCohortUsers: () => dispatch(getAllCohortUsers())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCohort)
