import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

class Login extends Component {
  // This state is used to set the tabs to active.
  state = { value: 0 }
  handleValueChange = (event, value) => this.setState({ value })

  render() {
    const { handleValueChange, redirect } = this
    const { value } = this.state
    const { userDetails } = this.props

    if (userDetails.id)
      return <Redirect to={`${userDetails.isAdmin ? '/admin' : '/student'}`} />

    return (
      <div style={styles.root}>
        <Paper style={styles.paper}>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            onChange={handleValueChange}
          >
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>

          <div style={styles.form}>
            {value === 0 && <LoginForm redirect={redirect} />}
            {value === 1 && <SignUpForm redirect={redirect} />}
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
  },
  form: {
    margin: '1em 2em 2em 2em',
    width: '40vw'
  }
}

const mapStateToProps = ({ userDetails }) => ({ userDetails })

export default connect(mapStateToProps)(Login)
