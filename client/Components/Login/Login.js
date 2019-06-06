import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../../store/auth/actions'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'

import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

const Login = props => {
  // This state is used to update visual changes to the Tabs component.
  const [value, setValue] = useState(0)
  const handleValueChange = (event, value) => setValue(value)

  return (
    <div style={styles.root}>
      <Paper style={styles.paper}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleValueChange}
          variant="fullWidth"
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        <div style={{ margin: '1em 2em 2em 2em', width: '40vw' }}>
          {value === 0 && <LoginForm history={props.history} />}
          {value === 1 && <SignUpForm />}
        </div>
      </Paper>
    </div>
  )
}

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh'
  },
  paper: {
    position: 'fixed',
    top: '15vh'
  }
}

const mapStateToProps = ({ userDetails }) => ({ userDetails })

export default Login
