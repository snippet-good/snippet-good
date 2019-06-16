import React, { useState } from 'react'

import { connect } from 'react-redux'
import { createUser } from '../../store/users/actions'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'

import TextInputGroup from './TextInputGroup'

const SignUpForm = props => {
  // This state is used to catch any errors received from the server.
  const [errors, setErrors] = useState({})

  // This state is used to store the user's information.
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

  // This event handler is to update 'userInformation' state with
  // the value of the various inputs in the sign up form.
  const handleChange = event => {
    const { name, value } = event.target
    setUserInformation({ ...userInformation, [name]: value })
  }

  const handleSelectChange = event => console.log(event)

  // This event handler is invoked when the user presses the submit button
  // on the sign up page. The server will attempt to create a new user.
  const handleSubmit = event => {
    event.preventDefault()

    props
      .createUser(userInformation)
      .catch(err => setErrors(err.response.data.errors))
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

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '24px'
        }}
      >
        <InputLabel>I am a</InputLabel>
        <Select
          name="isAdmin"
          value={userInformation.isAdmin}
          onChange={handleChange}
          autoWidth
          style={{ width: '45%' }}
        >
          <MenuItem value={false}>Student</MenuItem>
          <MenuItem value={true}>Teacher</MenuItem>
        </Select>
      </div>

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
