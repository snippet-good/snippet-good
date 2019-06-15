import React from 'react'

import { connect } from 'react-redux'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

const CohortSelect = props => {
  const { style, cohorts, cohortId, stretchId } = props
  const { handleChange } = props

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <InputLabel shrink>Selected Cohort</InputLabel>
        <Select
          name="cohortId"
          value={cohortId}
          style={{ ...style }}
          onChange={handleChange}
        >
          {cohorts.map(c => (
            <MenuItem key={c.id} value={c.id}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  )
}

CohortSelect.defaultProps = {
  cohortId: '',
  style: { width: '100%' },
  handleChange: () => {}
}

const mapStateToProps = ({ cohorts, cohortStretches }, { stretchId }) => {
  const cohortsAlreadyUsedStretch = cohortStretches
    .filter(cs => cs.stretchId === stretchId)
    .map(cs => cs.cohortId)
  return {
    cohorts: cohorts.filter(c => !cohortsAlreadyUsedStretch.includes(c.id))
  }
}

export default connect(mapStateToProps)(CohortSelect)
