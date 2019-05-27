import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Home, Login, CodeEditor } from './index'
import { checkIfUserLoggedInThunk } from '../store/thunks'
import { connect } from 'react-redux'

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
          <Route path="/code" exact component={CodeEditor} />
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
