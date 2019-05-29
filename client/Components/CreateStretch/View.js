import React from 'react'
import { connect } from 'react-redux'

import associate from '../../misc/associate'

const CreateStretch = props => {
  if (!props.stretches || !props.users) return null
  console.log(
    associate(props.stretches, [{ key: 'author', data: props.users }])
  )

  return (
    <div>
      <ul>
        {props.stretches.map(s => (
          <li>{s.title}</li>
        ))}
      </ul>
    </div>
  )
}

const mapStateToProps = ({ stretches, users }) => ({ stretches, users })

export default connect(mapStateToProps)(CreateStretch)
