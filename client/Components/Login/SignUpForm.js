import React, { Fragment } from 'react'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
const SignUpForm = props => {
  return (
    <form>
      {/* Username text input */}
      <TextField label="Username" margin="normal" fullWidth />

      {/* Personal information input section */}
      <div style={styles.inner}>
        <TextField
          label="First Name"
          margin="normal"
          style={styles.halfInput}
        />

        <TextField label="Last Name" margin="normal" style={styles.halfInput} />
      </div>

      {/* Password input section */}
      <div style={styles.inner}>
        <TextField
          type="password"
          label="Password"
          margin="normal"
          style={styles.halfInput}
        />
        <TextField
          type="password"
          label="Confirm Password"
          margin="normal"
          style={styles.halfInput}
        />
      </div>

      {/* Email input section */}
      <TextField type="email" label="Email" margin="normal" fullWidth />

      <TextField type="email" label="Confirm Email" margin="normal" fullWidth />

      <Select>
        <MenuItem>Teacher</MenuItem>
        <MenuItem>Student</MenuItem>
      </Select>

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

export default SignUpForm
