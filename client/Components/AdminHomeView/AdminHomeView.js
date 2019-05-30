import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllCohorts } from '../../store/cohorts/actions'

const AdminHomeView = ({ cohorts, getAllCohorts }) => {
  useEffect(() => {
    getAllCohorts()
  }, [])
  return (
    <div>
      <h2>Welcome Admin! Your cohorts:</h2>
      <ul>
        {cohorts.length
          ? cohorts.map(cohort => (
              <li key={cohort.id}>
                <Link to={`/cohort/${cohort.id}`}>{cohort.name}</Link>
              </li>
            ))
          : ''}
      </ul>
    </div>
  )
}

const mapStateToProps = ({ cohorts, cohortStretches }) => ({
  cohorts,
  cohortStretches
})

const mapDispatchToProps = dispatch => {
  return {
    getAllCohorts: () => dispatch(getAllCohorts())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminHomeView)
