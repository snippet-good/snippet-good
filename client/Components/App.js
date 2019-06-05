// React imports
import React, { Component } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

// Redux imports
import { connect } from 'react-redux'
import { checkIfUserLoggedInThunk } from '../store/auth/actions'

// For testing purposes only, remove as needed
import { getAllUsers } from '../store/users/actions'
import { getAllCohorts } from '../store/cohorts/actions'
import { getAllCohortUsers } from '../store/cohort-users/actions'
import { getAllCategories } from '../store/categories/actions'
import { getAllStretches } from '../store/stretches/actions'
import { getAllStretchAnswers } from '../store/stretch-answers/actions'
import { getAllCohortStretches } from '../store/cohort-stretches/actions'

// React sub-components
import {
  Home,
  Login,
  AdminController,

  StudentHomeView,
  OpenStretchView,
  StudentClosedStretchView
} from './index'

class App extends Component {
  componentDidMount() {
    this.props.checkIfUserLoggedIn()

    // For testing purposes only, remove as needed
    this.props.load()
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route
            path="/student/stretchAnswer/:stretchAnswerId"
            exact
            component={StudentClosedStretchView}
          />
          <Route path="/student" exact component={StudentHomeView} />
          <Route
            path="/student/stretch/:stretchId"
            exact
            component={OpenStretchView}
          />
          <AdminController />
        </Switch>
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkIfUserLoggedIn: () => dispatch(checkIfUserLoggedInThunk()),

    // For testing purposes only, remove as needed
    load: () => {
      // dispatch(getAllUsers())
      dispatch(getAllCohorts())
      dispatch(getAllCohortUsers())
      dispatch(getAllCategories())
      dispatch(getAllStretches())
      dispatch(getAllStretchAnswers())
      dispatch(getAllCohortStretches())
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App)

/*<Switch>
<Route path="/admin" exact component={AdminController} />
<Route path="/cohort/:id" exact component={SingleCohort} />
<Route path="/" exact component={Home} />
<Route path="/login" exact component={Login} />

<Route path="/stretches/create" component={CreateStretch} />
</Switch>*/
