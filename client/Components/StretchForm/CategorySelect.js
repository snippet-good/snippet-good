import React from 'react'

import { connect } from 'react-redux'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const CategorySelect = props => {
  const { categories, attributes, style } = props
  const { handleChange } = props
  const { categoryId } = attributes
  if (!categories) return null

  return (
    <Select
      name="categoryId"
      value={categoryId}
      autoWidth
      style={{ ...style }}
      onChange={handleChange}
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {categories.map(c => (
        <MenuItem key={c.id} value={c.id}>
          {c.name}
        </MenuItem>
      ))}
    </Select>
  )
}

CategorySelect.defaultProps = {
  style: { width: '100%' },
  handleChange: () => {}
}

const mapStateToProps = ({ categories }) => ({ categories })

export default connect(mapStateToProps)(CategorySelect)
