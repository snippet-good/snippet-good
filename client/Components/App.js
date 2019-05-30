// React imports
import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

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
// import { Home, Login, CodeEditor, AdminHomeView, SingleCohort } from './index'
import { AdminStretches } from './index';


class App extends Component {
  componentDidMount() {
    this.props.checkIfUserLoggedIn()

    // For testing purposes only, remove as needed
    this.props.load()
  }

  render() {
    //return <div>hi</div>

    return (
      <Router>
        <Switch>
          {/* <Route path='/admin' exact component={AdminHomeView} /> */}
          <Route path='/admin/stretches' exact component={AdminStretches} />
          {/* <Route path='/cohort/:id' exact component={SingleCohort} />
          <Route path='/' exact component={Home} />
          <Route path='/login' exact component={Login} />
          <Route path='/code' exact component={CodeEditor} /> */}
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
      dispatch(getAllUsers())
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
