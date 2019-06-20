import React from 'react'

import { connect } from 'react-redux'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

const CohortSelect = props => {
  const { style, cohorts, cohortId } = props
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
          {cohorts.map(c => {
            return (
              <MenuItem
                key={c.id}
                value={c.id}
                style={c.alreadyUsed ? { color: 'red' } : {}}
              >
                {c.name}
              </MenuItem>
            )
          })}
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
    cohorts: cohorts.map(cohort => ({
      ...cohort,
      alreadyUsed: cohortsAlreadyUsedStretch.includes(cohort.id)
    }))
  }
}

export default connect(mapStateToProps)(CohortSelect)
