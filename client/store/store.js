import { createStore, combineReducers, applyMiddleware } from 'redux'

// Redux middleware
import thunk from 'redux-thunk'
import reduxLogger from 'redux-logger'

// Reducers
import userDetails from './auth/reducer' // Manages user authentication

import users from './users/reducer'
import cohorts from './cohorts/reducer'

import categories from './categories/reducer'
import stretches from './stretches/reducer'
import cohortStretches from './cohort-stretches/reducer'

const store = createStore(
  combineReducers({
    // Authentication state
    userDetails,

    // User-related state
    users,
    cohorts,

    // Stretch-related state
    categories,
    stretches,
    cohortStretches
  }),
  applyMiddleware(thunk, reduxLogger)
)

export default store
