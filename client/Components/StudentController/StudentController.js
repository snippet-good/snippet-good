import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import StudentHomeView from '../StudentHomeView'
import OpenStretchView from '../OpenStretchView'
import StudentClosedStretchView from '../StudentClosedStretchView'

const StudentController = () => {
  return (
    <Fragment>
      <Route path="/student" exact component={StudentHomeView} />
      <Route
        path="/student/stretch/:stretchId"
        exact
        component={OpenStretchView}
      />
      <Route
        path="/student/stretchAnswer/:stretchAnswerId"
        exact
        component={StudentClosedStretchView}
      />
    </Fragment>
  )
}

export default StudentController
