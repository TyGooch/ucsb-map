import merge from 'lodash/merge'

import { TOGGLE_SIDEBAR, TOGGLE_SATELLITE } from '../actions/sideBarActions'

const defaultSideBar = Object.freeze({
  sideBarOpened: false,
  satelliteBasemapActive: false
})

const sideBarReducer = (state = defaultSideBar, action) => {
  Object.freeze(state)

  switch(action.type) {
    case TOGGLE_SIDEBAR:
      return merge({}, state, {sideBarOpened: !state.sideBarOpened})
    case TOGGLE_SATELLITE:
      return merge({}, state, {satelliteBasemapActive: !state.satelliteBasemapActive})
    default:
      return state
  }
}

export default sideBarReducer
