// React imports
import React, { Component, Fragment } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

// Redux imports
import { connect } from 'react-redux'

import { getAllCohorts } from '../store/cohorts/actions'
import { getAllCohortUsers } from '../store/cohort-users/actions'
import { getAllCategories } from '../store/categories/actions'
import { getAllStretches } from '../store/stretches/actions'
import { getAllStretchAnswers } from '../store/stretch-answers/actions'
import { getAllCohortStretches } from '../store/cohort-stretches/actions'

// React sub-components
import { Login, AdminController, StudentController } from './index'

class App extends Component {
  componentDidMount() {
    this.props.load()
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Route path="/" exact component={Login} />
          <Route path="/admin" component={AdminController} />
          <Route path="/student" component={StudentController} />
        </Fragment>
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: () => {
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
