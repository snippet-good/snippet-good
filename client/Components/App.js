import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Home, Login, CodeEditor, AdminHomeView, SingleCohort } from './index'
import { checkIfUserLoggedInThunk, fetchStretches } from '../store/thunks'
import { connect } from 'react-redux'

class App extends Component {
  constructor() {
    super()
    this.getData = this.getData.bind(this)
  }
  componentDidMount() {
    this.getData()
  }
  getData() {
    this.props.checkIfUserLoggedIn()
    this.props.fetchStretches()
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/admin" exact component={AdminHomeView} />
          <Route path="/cohort/:id" exact component={SingleCohort} />
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
    checkIfUserLoggedIn: () => dispatch(checkIfUserLoggedInThunk()),
    fetchStretches: () => dispatch(fetchStretches())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App)
