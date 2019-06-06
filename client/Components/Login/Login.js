import React, { useState } from 'react'

import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

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
          {value === 1 && <SignUpForm history={props.history} />}
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
