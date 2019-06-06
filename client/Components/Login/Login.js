import React, { Component } from 'react'

import { connect } from 'react-redux'

import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

class Login extends Component {
  state = { value: 0 }
  handleValueChange = (event, value) => this.setState({ value })

  // This function will redirect the user if he/she is logged in.
  redirect = user =>
    this.props.history.push(user.isAdmin ? '/admin' : '/student')

  render() {
    const { state, props } = this
    const { handleValueChange, redirect } = this
    const { value } = state

    // If the user is already logged in, redirect the user to the appropriate dashboard.

    // NEED TO TAKE CARE OF THIS
    // The following error pops up when successfully signing up:
    // Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.
    if (Object.keys(props.userDetails).length) redirect(props.userDetails)

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
            {value === 0 && <LoginForm />}
            {value === 1 && <SignUpForm />}
          </div>
        </Paper>
      </div>
    )
  }
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

export default connect(mapStateToProps)(Login)
