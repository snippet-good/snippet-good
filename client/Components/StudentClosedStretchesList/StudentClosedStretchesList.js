import React, { Component } from 'react'
import { connect } from 'react-redux'
import { checkIfAllDataExists } from '../../utilityfunctions'

export class StudentClosedStretchesList extends Component {
  render() {
    return <div />
  }
}

const mapStateToProps = ({
  userDetails,
  cohortUsers,
  stretches,
  cohortStretches
}) => {
  if (
    !checkIfAllDataExists(userDetails, cohortUsers, stretches, cohortStretches)
  ) {
    return []
  }

  const studentCohorts = cohortUsers.map(cu => cu.cohortId)
  const closedCohortStretches = cohortStretches.filter(
    cs => cs.status === 'clsoed' && studentCohorts.includes(cs.cohortId)
  )
}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentClosedStretchesList)
