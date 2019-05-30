// import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { connect } from 'react-redux'
// import { fetchCohorts } from '../../store/thunks'

// const mapStateToProps = ({ cohorts }) => {
//   return {
//     cohorts
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchCohorts: () => dispatch(fetchCohorts())
//   }
// }
// const AdminHomeView = ({ cohorts, fetchCohorts }) => {
//   useEffect(() => {
//     fetchCohorts()
//   }, [])
//   return (
//     <div>
//       <h2>Welcome Admin! Your cohorts:</h2>
//       <ul>
//         {cohorts.length
//           ? cohorts.map(cohort => (
//               <li key={cohort.id}>
//                 <Link to={`/cohort/${cohort.id}`}>{cohort.name}</Link>
//               </li>
//             ))
//           : ''}
//       </ul>
//     </div>
//   )
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AdminHomeView)
