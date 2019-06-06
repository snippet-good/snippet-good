import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { AdminStretches, AdminHomeView, SingleCohort } from '../../Components'
import SingleStretch from '../SingleStretch/SingleStretch'
import Sidebar from '../Sidebar'
import FrameworkHOC from '../FrameworkHOC'
import StretchReviewView from '../StretchReviewView'

class AdminController extends Component {
  render() {
    return (
      <div>
        <Route path="/admin" exact component={AdminHomeView} />
        <Route path="/admin/cohort/:id" exact component={SingleCohort} />

        {/* This route displays all of the admin's stretches. */}
        <Route path="/admin/stretches" exact component={AdminStretches} />

        {/* This route displays a form that creates a new stretch when successfully submitted. */}
        <Route
          exact
          path="/admin/stretches/create"
          render={routeProps => <SingleStretch mode="create" {...routeProps} />}
        />

        {/* This route displays relevant information about a single stretch. */}
        <Route
          exact
          path="/admin/singleStretch/:id"
          render={routeProps => <SingleStretch mode="read" {...routeProps} />}
        />

        {/* This route is JSBin-like classroom for admin to go over completed stretch */}
        <Route
          exact
          path="/admin/stretchReview/:cohortStretchId"
          component={StretchReviewView}
        />
      </div>
    )
  }
}

export default FrameworkHOC(AdminController, Sidebar)
