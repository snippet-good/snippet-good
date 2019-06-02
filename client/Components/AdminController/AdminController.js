import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { AdminStretches, AdminHomeView, SingleCohort } from '../../Components'
import SingleStretch from '../SingleStretch/SingleStretch'

class AdminController extends Component {
  render() {
    return (
      <div>
        <Route path="/admin" exact component={AdminHomeView} />
        <Route path="/admin/cohort/:id" exact component={SingleCohort} />

        {/* This route displays all of the admin's stretches. */}
        <Route path="/admin/stretches" exact component={AdminStretches} />

        {/* This route displays relevant information about a single stretch. */}
        <Route
          path="/admin/stretches/:id"
          render={routeProps => <SingleStretch mode="read" {...routeProps} />}
        />

        {/* This route displays a form that creates a new stretch when successfully submitted. */}
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
