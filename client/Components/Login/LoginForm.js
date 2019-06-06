import React, { useState } from 'react'

import { connect } from 'react-redux'
import { login } from '../../store/auth/actions'

import Button from '@material-ui/core/Button'

import TextInputGroup from './TextInputGroup'

const LoginForm = props => {
  // This state is used to catch any errors received from the server.
  const [errors, setErrors] = useState({})

  // This event handler is invoked when the user presses the submit button
  // on the login page. The server will authenticate the user based on the
  // credentials provided.
  const handleSubmit = event => {
    event.preventDefault()

    const { email, password } = event.target
    props
      .login({ email: email.value, password: password.value })
      .then(() => props.redirect())
      .catch(err => setErrors(err.response.data.errors))
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Email input */}
      <TextInputGroup
        name="email"
        label="Email"
        fullWidth={true}
        errors={errors.email}
      />

      {/* Password input */}
      <TextInputGroup
        name="password"
        type="password"
        label="Password"
        fullWidth={true}
        errors={errors.password}
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
