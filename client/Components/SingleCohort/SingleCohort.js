import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchCohort, fetchStudents, fetchStretches } from '../../store/thunks'
import Sidebar from '../Sidebar'

const mapStateToProps = ({ cohort, students, stretches }) => {
  return {
    cohort,
    students,
    stretches
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCohort: cohortId => dispatch(fetchCohort(cohortId)),
    fetchStudents: cohortId => dispatch(fetchStudents(cohortId)),
    fetchStretches: cohortId => dispatch(fetchStretches(cohortId))
  }
}

const SingleCohort = ({
  match,
  cohort,
  students,
  stretches,
  fetchCohort,
  fetchStudents,
  fetchStretches
}) => {
  const cohortId = match.url.slice(8)
  useEffect(() => {
    fetchCohort(cohortId)
    fetchStudents(cohortId)
    fetchStretches(cohortId)
  }, [])
  return (
    <div>
      <Sidebar cohortId={cohortId} />
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCohort)
