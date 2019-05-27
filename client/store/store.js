import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reduxLogger from 'redux-logger'
import user from './user-reducer'
import socketMiddleware from './socket/middleare'

const store = createStore(
  combineReducers({ user }),
  applyMiddleware(socketMiddleware, thunk, reduxLogger)
)

export default store
