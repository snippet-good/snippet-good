import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchCohort, fetchStretchesByStatus } from '../../store/thunks'
import { StretchList } from '../../Components'

const mapStateToProps = ({ cohort, stretches }) => {
  return {
    cohort,
    stretches
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCohort: cohortId => dispatch(fetchCohort(cohortId)),
    fetchStretchesByStatus: (cohortId, status) =>
      dispatch(fetchStretchesByStatus(cohortId, status))
  }
}

const Sidebar = ({ cohortId, cohort, stretches, fetchStretchesByStatus }) => {
  const [status, setStatus] = useState('')
  useEffect(() => {
    fetchCohort(cohortId)
    fetchStretchesByStatus(cohortId, status)
  }, [status])
  return (
    <div>
      <form>
        <label>
          View Stretches by Status:
          <select onChange={ev => setStatus(ev.target.value)}>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </label>
      </form>
      <StretchList stretches={stretches} />
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)
