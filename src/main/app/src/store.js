import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import rootReducer from './reducers/rootReducer'

export const history = createHistory()

const initialState = {}
const middleware = [thunk, routerMiddleware(history), logger]

export default createStore(rootReducer, initialState, applyMiddleware(...middleware))
