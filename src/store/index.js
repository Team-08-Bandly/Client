import { createStore, combineReducers, applyMiddleware } from 'redux'
import loginStatus from './reducers/loginStatus'
import userData from './reducers/userData'
import bands from './reducers/bands'

import thunk from 'redux-thunk'
const mainReducer = combineReducers({
  loginStatus,
  bands,
  userData
})

const store = createStore(mainReducer, applyMiddleware(thunk))

export default store
