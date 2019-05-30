import React, { useState } from 'react'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  }
}))

const SingleCohort = ({ cohort, cohortStudents }) => {
  const { root } = useStyles()
  const { name } = cohort
  const [value, setValue] = useState('stretches')

  return (
    <div className={root}>
      <Typography variant="h5" gutterBottom>
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
      {value === 'stretches' && (
        <Typography component="div">stretches coming</Typography>
      )}
      {value === 'students' && (
        <Typography component="div">
          <ul>
            {cohortStudents.map(student => (
              <li key={student.id}>
                <Link to={`/admin/student/${student.id}`}>{`${
                  student.firstName
                } ${student.lastName}`}</Link>
              </li>
            ))}
          </ul>
        </Typography>
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

export default connect(mapStateToProps)(SingleCohort)
