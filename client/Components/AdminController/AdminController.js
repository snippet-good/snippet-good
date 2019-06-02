import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { AdminStretches, AdminHomeView, SingleCohort } from '../../Components'
import SingleStretch from '../SingleStretch/SingleStretch'

class AdminController extends Component {
  render() {
    return (
      <div>
        <Route path="/admin" exact component={AdminHomeView} />
        <Route path="/admin/stretches" exact component={AdminStretches} />
        <Route path="/admin/cohort/:id" exact component={SingleCohort} />
        <Route
          path="/admin/stretches/create"
          exact
          render={routeProps => <SingleStretch mode="create" {...routeProps} />}
        />
      </div>
    )
  }
}

export default AdminController
