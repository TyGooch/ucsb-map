
import { combineReducers } from 'redux'

import locations from './locationsReducer'
import sideBar from './sideBarReducer'

const rootReducer = combineReducers({
    locations,
    sideBar
})

export default rootReducer
