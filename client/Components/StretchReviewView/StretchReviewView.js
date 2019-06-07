import React from 'react'
import { connect } from 'react-redux'
import GeneralInfo from '../SingleStretch/GeneralInfo'
import { checkIfAllDataExists } from '../../utilityfunctions'

const StretchReviewView = ({ attributes, currentCohortStretch }) => {
  if (!attributes) return <div>Data still loading</div>

  return <GeneralInfo attributes={attributes} />
}

const mapStateToProps = (
  { cohortStretches, stretches },
  {
    match: {
      params: { cohortStretchId }
    }
  }
) => {
  if (!checkIfAllDataExists(cohortStretches, stretches)) return {}

  const currentCohortStretch = cohortStretches.find(
    cs => cs.id === cohortStretchId
  )
  if (!currentCohortStretch) return {}
  const selectedStretch = stretches.find(
    stretch => stretch.id === currentCohortStretch.stretchId
  )
  if (!selectedStretch) return {}

  const attributes = { mode: 'read', ...selectedStretch }

  return { attributes, currentCohortStretch }
}

export default connect(mapStateToProps)(StretchReviewView)
