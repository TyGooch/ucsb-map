import merge from 'lodash/merge'

import { TOGGLE_SIDEBAR } from '../actions/sideBarActions'

const defaultSideBar = Object.freeze({
  sideBarOpened: false
})

const sideBarReducer = (state = defaultSideBar, action) => {
  Object.freeze(state)

  switch(action.type) {
    case TOGGLE_SIDEBAR:
      return merge({}, state, {sideBarOpened: !state.sideBarOpened})
    default:
      return state
  }
}

export default sideBarReducer
