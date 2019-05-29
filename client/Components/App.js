// React imports
import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

// Redux imports
import { connect } from 'react-redux'
import { checkIfUserLoggedInThunk } from '../store/auth/actions'
import { getAllUsers } from '../store/users/actions'

// React sub-components
// import { Home, Login, CodeEditor, AdminHomeView, SingleCohort } from './index'

class App extends Component {
  componentDidMount() {
    this.props.checkIfUserLoggedIn()
    this.props.getUsers()
  }

  render() {
    const { users } = this.props

    return (
      <div>
        <ul>
          <li>Users: {users ? users.length : 0}</li>
        </ul>
      </div>
    )
    return (
      <Router>
        <Switch>
          <Route path='/admin' exact component={AdminHomeView} />
          <Route path='/cohort/:id' exact component={SingleCohort} />
          <Route path='/' exact component={Home} />
          <Route path='/login' exact component={Login} />
          <Route path='/code' exact component={CodeEditor} />
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = ({ users }) => ({ users })

const mapDispatchToProps = dispatch => {
  return {
    checkIfUserLoggedIn: () => dispatch(checkIfUserLoggedInThunk()),
    getUsers: () => dispatch(getAllUsers())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
