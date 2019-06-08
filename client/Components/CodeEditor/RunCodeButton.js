import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { runCodeResultThunk } from '../../store/codeEditor/actions'

/*class RunCodeButton extends Component {
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
  }

  render() {
    const { variant, size, color, runCode, code } = this.props
    console.log(this.props)
    console.log(this.props.variant)
    return (
      <Button
        variant={variant || 'text'}
        size={size || 'small'}
        color={color}
        type="button"
        onClick={() => runCode(code)}
      />
    )
  }
}*/

const RunCodeButton = ({ variant, size, color, runCode, code }) => {
  return (
    <Button
      variant={variant || 'text'}
      size={size || 'small'}
      color={color}
      type="button"
      onClick={() => runCode(code)}
    >
      Run Code
    </Button>
  )
}

/*const mapDispatchToProps = dispatch => {
  return {
    runCodeResult: code => dispatch(runCodeResultThunk(code))
  }
}*/

export default RunCodeButton

/*export default connect(
  null,
  mapDispatchToProps
)(RunCodeButton)*/
