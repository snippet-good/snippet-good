import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import StudentHomeView from '../StudentHomeView'
import OpenStretchView from '../OpenStretchView'
import StudentClosedStretchView from '../StudentClosedStretchView'
import FrameworkHOC from '../FrameworkHOC'

const StudentController = () => {
  return (
    <Fragment>
      {/* path to go to student's home view */}
      <Route path="/student" exact component={StudentHomeView} />

      {/* path to go to view to complete stretch currently open */}
      <Route
        path="/student/stretch/:stretchId"
        exact
        component={OpenStretchView}
      />

      {/* path to go to view of closed stretch to see official solution, etc.*/}
      <Route
        path="/student/stretchAnswer/:stretchAnswerId"
        exact
        component={StudentClosedStretchView}
      />
    </Fragment>
  )
}

export default StudentController
