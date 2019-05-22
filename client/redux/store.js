import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reduxLogger from 'redux-logger'

const store = createStore(
  combineReducers({}),
  applyMiddleware(thunk, reduxLogger)
)

export default store
