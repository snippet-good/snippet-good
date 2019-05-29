import React from 'react'
import { connect } from 'react-redux'

const CreateStretch = props => {
  return <div>hi</div>
}

const mapStateToProps = ({ stretches, stretchAnswers }) => ({
  stretches,
  stretchAnswers
})

export default connect(mapStateToProps)(CreateStretch)
