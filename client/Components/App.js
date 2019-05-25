import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Home, Login } from './index'
import { checkForUserThunk } from '../store/thunks'
import { connect } from 'react-redux'

class App extends Component {
  componentDidMount() {
    return this.props.checkForUser()
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkForUser: () => dispatch(checkForUserThunk())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App)
