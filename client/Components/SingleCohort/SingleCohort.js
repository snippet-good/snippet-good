import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles'
import SingleCohortStretchTables from './SingleCohortStretchTables'
import { CohortStudents } from './CohortStudents'

// const useStyles = makeStyles(theme => ({
//   root: {
//     backgroundColor: theme.palette.background.paper,
//     width: 500
//   }
// }))

// const SingleCohort = ({ cohort, cohortStudents }) => {
//   const { root } = useStyles()
//   const { name } = cohort
//   const [value, setValue] = useState('stretches')

//   return (
//     <div className={root}>
//       <Typography
//         variant="h5"
//         gutterBottom
//       >
//         {name}
//       </Typography>

//       <AppBar position="static" color="default">
//         <Tabs
//           value={value}
//           onChange={(event, newValue) => setValue(newValue)}
//           indicatorColor="primary"
//           textColor="primary"
//           variant="fullWidth"
//         >
//           <Tab value="stretches" label="Stretches" />
//           <Tab value="students" label="Students" />
//         </Tabs>
//       </AppBar>
//       {value === 'stretches' && <SingleCohortStretchTables cohort={cohort} />}
//       {value === 'students' && (
//         <CohortStudents cohortStudents={cohortStudents} />
//       )}
//     </div>
//   )
// }
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Calendar from 'react-calendar'

import Attendance from './Attendance'

class SingleCohort extends Component {
  state = {
    tab: 0,
    currentDate: new Date()
  }

  // This event handler handles changes on the Calendar component.
  handleCalendarChange = currentDate => this.setState({ currentDate })

  handleTabsChange = (event, tab) => this.setState({ tab })

  render() {
    const { state, props } = this
    const { handleCalendarChange, handleTabsChange } = this

    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', width: '100vw' }}
      >
        <Grid container spacing={2} style={{ width: '80%' }}>
          <Grid item xs={6}>
            <Typography variant="h3">{props.cohort.name}</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Calendar
              onChange={handleCalendarChange}
              value={state.currentDate}
            />
          </Grid>

          <Grid item xs={12} style={{ height: '20px' }} />

          <Grid item xs={12}>
            <Tabs
              value={state.tab}
              onChange={handleTabsChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Attendance" />
              <Tab label="Stretches" />
            </Tabs>
          </Grid>

          <Grid item xs={12}>
            {state.tab === 0 && <Attendance cohortId={props.match.params.id} />}
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = ({ cohorts, users }, { match: { params } }) => ({
  cohortStudents: users.filter(student =>
    student.cohortIds.includes(params.id)
  ),
  cohort: cohorts.find(cohort => cohort.id === params.id) || {}
})

export default connect(mapStateToProps)(SingleCohort)
