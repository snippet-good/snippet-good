import { createStore, combineReducers, applyMiddleware } from 'redux'

// Redux middleware
import thunk from 'redux-thunk'
import reduxLogger from 'redux-logger'

// Reducers
import userDetails from './auth/reducer' // Manages user authentication

import users from './users/reducer'
import cohorts from './cohorts/reducer'

import categories from './categories/reducer'

const store = createStore(
  combineReducers({ userDetails, users, cohorts, categories }),
  applyMiddleware(thunk, reduxLogger)
)

export default store
