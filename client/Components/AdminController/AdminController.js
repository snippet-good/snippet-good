import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { AdminStretches, AdminHomeView, SingleCohort } from '../../Components'
import CreateStretch from '../../Components/CreateStretch/View'

class AdminController extends Component {
  render() {
    return (
      <div>
        <Route path="/admin" exact component={AdminHomeView} />
        <Route path="/admin/stretches" exact component={AdminStretches} />
        <Route path="/admin/cohort/:id" exact component={SingleCohort} />
        <Route path="/admin/stretches/create" exact component={CreateStretch} />
      </div>
    )
  }
}

export default AdminController
