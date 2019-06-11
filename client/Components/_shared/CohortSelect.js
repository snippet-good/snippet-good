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

const mapStateToProps = ({ cohorts }) => ({ cohorts })
// const { userDetails, cohorts, cohortUsers } = state

// const userCohorts = cohortUsers
//   .filter(e => e.userId === userDetails.id) // Find all cohorts associated to user
//   .map(e => cohorts.find(cohort => cohort.id === e.cohortId)) // Associate cohort details to UserCohort

// return { cohorts: userCohorts }
//}

export default connect(mapStateToProps)(CohortSelect)
