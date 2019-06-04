import { createStore, combineReducers, applyMiddleware } from 'redux'

// Redux middleware
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

// Reducers
import userDetails from './auth/reducer' // Manages user authentication

import users from './users/reducer'
import cohorts from './cohorts/reducer'
import cohortUsers from './cohort-users/reducer'

import categories from './categories/reducer'
import stretches from './stretches/reducer'
import stretchAnswers from './stretch-answers/reducer'
import cohortStretches from './cohort-stretches/reducer'

const logger = createLogger({
  collapsed: true
})

const store = createStore(
  combineReducers({
    // Authentication state
    userDetails,

    // User-related state
    users,
    cohorts,
    cohortUsers,

    // Stretch-related state
    categories,
    stretches,
    stretchAnswers,
    cohortStretches
  }),
  applyMiddleware(thunk, logger)
)

export default store
