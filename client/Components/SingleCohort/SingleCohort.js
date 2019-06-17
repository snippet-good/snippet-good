import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAttendance } from '../../store/attendance/actions'

import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Calendar from 'react-calendar'
import SingleCohortStretchTables from './SingleCohortStretchTables'
import CohortStudents from './CohortStudents'

import Attendance from './Attendance'

class SingleCohort extends Component {
  state = {
    tab: 0,
    currentDate: new Date(),
    attendanceRecords: {}
  }

  getAttendance = async (currentDate = this.state.currentDate) => {
    const cohortId = this.props.match.params.id
    const attendanceRecords = await getAttendance(cohortId, currentDate)
    this.setState({ attendanceRecords })
  }

  // This event handler handles changes on the Calendar component.
  handleCalendarChange = async currentDate => {
    await this.getAttendance(currentDate)
    this.setState({ currentDate })
  }

  handleTabsChange = (event, tab) => this.setState({ tab })

  async componentDidMount() {
    await this.getAttendance()
  }

  render() {
    const { state, props } = this
    const { handleCalendarChange, handleTabsChange } = this

    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', width: '100vw' }}
      >
        <Grid container spacing={2} style={{ width: '98%' }}>
          <Grid item xs={7}>
            <Grid item xs={12}>
              <Tabs
                value={state.tab}
                onChange={handleTabsChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                style={{ marginBottom: '2em' }}
              >
                <Tab label="Attendance" />
                <Tab label="Stretches" />
                <Tab label="Students" />
              </Tabs>
            </Grid>

            <Grid item xs={12}>
              {state.tab === 0 && (
                <Attendance
                  cohortId={props.match.params.id}
                  records={state.attendanceRecords}
                />
              )}
              {state.tab === 1 && (
                <SingleCohortStretchTables cohort={props.cohort} />
              )}
              {state.tab === 2 && (
                <CohortStudents cohortStudents={props.cohortStudents} />
              )}
            </Grid>
          </Grid>

          <Grid item xs={1} />

          <Grid
            item
            xs={4}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Calendar
              onChange={handleCalendarChange}
              value={state.currentDate}
            />
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
