import React, { Fragment } from 'react'

import { connect } from 'react-redux'
import { login } from '../../store/auth/actions'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const LoginForm = props => {
  // This prop is used to redirect the user after successfully logging in.
  const { history } = props

  // This function handles the sign in submission on the form.
  const handleSubmit = event => {
    event.preventDefault()

    const { email, password } = event.target
    props
      .login({ email: email.value, password: password.value })
      .then(userDetails =>
        userDetails.isAdmin ? history.push('/admin') : history.push('/student')
      )
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Email input */}
      <TextField name="email" label="Email" margin="normal" fullWidth />

      {/* Password input */}
      <TextField
        name="password"
        type="password"
        label="Password"
        margin="normal"
        fullWidth
      />

      <div style={{ margin: '2em 0' }}>
        <Button type="submit" variant="contained" color="primary">
          Sign In
        </Button>
      </div>
    </form>
  )
}

const mapDispatchToProps = dispatch => ({
  login: credentials => dispatch(login(credentials))
})

export default connect(
  null,
  mapDispatchToProps
)(LoginForm)
