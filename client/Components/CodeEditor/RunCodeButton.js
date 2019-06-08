import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { runCodeResultThunk } from '../../store/codeEditor/actions'

class RunCodeButton extends Component {
  /*runCode = () => {
    return this.props
      .runCodeResult(this.props.code)
      .then(({ data }) => {
        this.setState({
          codeResponse: String(data),
          codeError: ''
        })
      })
      .catch(({ response: { data } }) => {
        this.setState({ codeError: data, codeResponse: '' })
      })
  }*/

  render() {
    const { variant, size, color, runCode, code } = this.props
    return (
      <Button
        variant={variant}
        size={size}
        color={color}
        type="button"
        onClick={() => runCode(code)}
      />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    runCodeResult: code => dispatch(runCodeResultThunk(code))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(RunCodeButton)
