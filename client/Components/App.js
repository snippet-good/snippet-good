import React, { Component } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { Home, Login } from '../Components'

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
      </Router>
    )
  }
}

export default App
