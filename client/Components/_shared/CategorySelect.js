import React from 'react'

import { connect } from 'react-redux'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

// This is a dropdown menu displaying all of the categories.

const CategorySelect = props => {
  const { categories, categoryId, style } = props
  const { handleChange } = props
  if (!categories) return null

  return (
    <div>
      <InputLabel shrink>Category</InputLabel>

      <Select
        name="categoryId"
        value={categoryId}
        autoWidth
        style={{ ...style }}
        onChange={handleChange}
      >
        {categories.map(c => (
          <MenuItem key={c.id} value={c.id}>
            {c.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}

CategorySelect.defaultProps = {
  style: { width: '100%' },
  handleChange: () => {}
}

const mapStateToProps = ({ categories }) => ({ categories })

export default connect(mapStateToProps)(CategorySelect)
