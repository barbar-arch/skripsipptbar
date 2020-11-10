import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import rootReducers from './reducers'
import agent from './agent'

const store = createStore(rootReducers, applyMiddleware(reduxThunk.withExtraArgument(agent)))

export default store
