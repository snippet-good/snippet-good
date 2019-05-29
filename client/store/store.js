import { createStore, combineReducers, applyMiddleware } from 'redux'

// Redux middleware
import thunk from 'redux-thunk'
import reduxLogger from 'redux-logger'

// Reducers
import userDetails from './auth/reducer' // Manages user authentication
import users from './users/reducer' // Manages all users

const store = createStore(
  combineReducers({ userDetails, users }),
  applyMiddleware(thunk, reduxLogger)
)

export default store
