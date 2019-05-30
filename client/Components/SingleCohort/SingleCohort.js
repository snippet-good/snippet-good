import React, { useEffect } from 'react'
import { connect } from 'react-redux'
/*import { fetchCohort, fetchStudents } from '../../store/thunks'

// const mapStateToProps = ({ cohort, students }) => {
//   return {
//     cohort,
//     students
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
    fetchCohort: cohortId => dispatch(fetchCohort(cohortId)),
    fetchStudents: cohortId => dispatch(fetchStudents(cohortId))
  }
}*/

const SingleCohort = ({
  match,
  cohort,
  students,
  fetchCohort,
  fetchStudents
}) => {
  //const cohortId = match.url.slice(8)
  ////useEffect(() => {
  //  fetchCohort(cohortId)
  //  fetchStudents(cohortId)
  //}, [])
  return <div>SingleCohort.</div>
}

export default connect(
  null,
  null
)(SingleCohort)
