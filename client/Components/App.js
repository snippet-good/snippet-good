import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Home, Login } from './index'
import { checkIfUserLoggedInThunk } from '../store/thunks'
import { connect } from 'react-redux'
import SocketComp from '../store/socket/SocketComp'

class App extends Component {
  componentDidMount() {
    return this.props.checkIfUserLoggedIn()
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/socket" exact component={SocketComp} />
        </Switch>
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkIfUserLoggedIn: () => dispatch(checkIfUserLoggedInThunk())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App)
