import React, { useState } from 'react'

import { connect } from 'react-redux'
import { createUser } from '../../store/users/actions'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

import TextInputGroup from './TextInputGroup'

const SignUpForm = props => {
  const { history } = props

  const [errors, setErrors] = useState({})

  const [userInformation, setUserInformation] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    isAdmin: false
  })

  const handleChange = event => {
    const { name, value } = event.target
    setUserInformation({ ...userInformation, [name]: value })
  }

  const handleSubmit = event => {
    event.preventDefault()

    props
      .createUser(userInformation)
      .then(userDetails => {
        userDetails.isAdmin ? history.push('/admin') : history.push('/student')
      })
      .catch(err => {
        setErrors(err.response.data.errors)
      })
  }

  return (
    <form onSubmit={handleSubmit} onChange={handleChange}>
      {/* Username text input */}
      <TextInputGroup
        name="userName"
        label="Username"
        fullWidth={true}
        errors={errors.userName}
      />

      {/* Personal information input section */}
      <div style={styles.inner}>
        <TextInputGroup
          name="firstName"
          label="First Name"
          style={styles.halfInput}
          errors={errors.firstName}
        />

        <TextInputGroup
          name="lastName"
          label="Last Name"
          style={styles.halfInput}
          errors={errors.lastName}
        />
      </div>

      {/* Password input section */}
      <div style={styles.inner}>
        <TextInputGroup
          name="password"
          type="password"
          label="Password"
          style={styles.halfInput}
          errors={errors.password}
        />
        <TextInputGroup
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          style={styles.halfInput}
          errors={errors.confirmPassword}
        />
      </div>

      {/* Email input section */}
      <TextInputGroup
        name="email"
        label="Email"
        fullWidth={true}
        errors={errors.email}
      />

      <TextInputGroup
        name="confirmEmail"
        label="Confirm Email"
        fullWidth={true}
        errors={errors.confirmEmail}
      />

      {/* Submit button */}
      <div style={{ margin: '2em 0' }}>
        <Button type="submit" variant="contained" color="primary">
          Sign Up
        </Button>
      </div>
    </form>
  )
}

const styles = {
  inner: { display: 'flex', justifyContent: 'space-between' },
  halfInput: { width: '45%' }
}

const mapDispatchToProps = dispatch => ({
  createUser: userInformation => dispatch(createUser(userInformation))
})

export default connect(
  null,
  mapDispatchToProps
)(SignUpForm)
