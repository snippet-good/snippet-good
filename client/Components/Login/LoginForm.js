import React, { useState } from 'react'

import { connect } from 'react-redux'
import { login } from '../../store/auth/actions'

import Button from '@material-ui/core/Button'

import TextInputGroup from './TextInputGroup'

const LoginForm = props => {
  // This prop is used to redirect the user after successfully logging in.
  const { history } = props

  const [errors, setErrors] = useState({})

  // This function handles the sign in submission on the form.
  const handleSubmit = event => {
    event.preventDefault()

    const { email, password } = event.target
    props
      .login({ email: email.value, password: password.value })
      .then(userDetails =>
        userDetails.isAdmin ? history.push('/admin') : history.push('/student')
      )
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
