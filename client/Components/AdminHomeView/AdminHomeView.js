import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCohortsOfAdminThunk } from '../../store/cohorts/actions'

const AdminHomeView = ({ cohorts, userId, getCohortsOfAdmin }) => {
  useEffect(() => {
    if (userId) {
      getCohortsOfAdmin(userId)
    }
  }, [userId])
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

const mapStateToProps = ({ cohorts, cohortStretches, userDetails }) => ({
  cohorts,
  cohortStretches,
  userDetails,
  userId: userDetails.id
})

const mapDispatchToProps = dispatch => {
  return {
    getCohortsOfAdmin: adminId => dispatch(getCohortsOfAdminThunk(adminId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminHomeView)
