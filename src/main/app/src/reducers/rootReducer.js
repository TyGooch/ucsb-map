import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';

import locations from './locationsReducer'
import sideBar from './sideBarReducer'

const rootReducer = combineReducers({
    router: routerReducer,
    locations,
    sideBar
})

export default rootReducer
