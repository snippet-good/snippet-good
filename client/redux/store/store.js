import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reduxLogger from 'redux-logger'
import user from './user-reducer'

const store = createStore(
  combineReducers({ user }),
  applyMiddleware(thunk, reduxLogger)
)

export default store
