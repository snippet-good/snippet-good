// React imports
import React, { Component, Fragment } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

// Redux imports
import { connect } from 'react-redux'
import { checkIfUserLoggedInThunk } from '../store/auth/actions'

// React sub-components
import { Login, AdminController, StudentController } from './index'

class App extends Component {
  componentDidMount() {
    this.props.checkIfUserLoggedIn()
  }

  render() {
    const { id } = this.props.userDetails
    return (
      <Router>
        <Fragment>
          {!id && <Route component={Login} />}
          {id && <Route path="/" exact component={Login} />}
          {id && <Route path="/admin" component={AdminController} />}
          {id && <Route path="/student" component={StudentController} />}
        </Fragment>
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkIfUserLoggedIn: () => dispatch(checkIfUserLoggedInThunk())
  }
}

const mapStateToProps = ({ userDetails }) => ({ userDetails })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
