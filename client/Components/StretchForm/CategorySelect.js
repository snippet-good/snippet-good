import React from 'react'

import { connect } from 'react-redux'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const CategorySelect = props => {
  const { categories, attributes } = props
  const { categoryId } = attributes
  if (!categories) return null

  return (
    <Select name="categoryName" value={categoryId} autoWidth>
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {categories.map(c => (
        <MenuItem key={c.id} value={c.name}>
          {c.name}
        </MenuItem>
      ))}
    </Select>
  )
}

const mapStateToProps = ({ categories }) => ({ categories })

export default connect(mapStateToProps)(CategorySelect)
