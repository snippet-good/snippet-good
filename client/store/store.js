import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reduxLogger from 'redux-logger'
import user from './user-reducer'
import cohort from './cohort-reducer'
import cohorts from './cohorts-reducer'
import students from './students-reducer'
import stretches from './stretches-reducer'

const store = createStore(
  combineReducers({ user, cohort, cohorts, students, stretches }),
  applyMiddleware(thunk, reduxLogger)
)

export default store
