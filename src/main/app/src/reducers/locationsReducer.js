import merge from 'lodash/merge'

import {
  RECEIVE_LOCATIONS,
  UPDATE_SELECTED_LOCATION
} from '../actions/locationActions'

const defaultState = Object.freeze({
  allLocations: [],
  selectedLocation: null
})

const locationsReducer = (state = defaultState, action) => {
  Object.freeze(state)

  switch(action.type) {
    case RECEIVE_LOCATIONS:
      if(!state[0]){

        let newLocations = []
        action.locations.forEach(location => {
          let newLocation = {}
          newLocation.name = location.name
          newLocation.category = location.category
          newLocation.polygons = JSON.parse(location.polygons)
          newLocation.color = location.color

          newLocations.push(newLocation)
        })

        return merge({}, state, {allLocations: newLocations})
      }
      return state
    case UPDATE_SELECTED_LOCATION:
      return merge({}, state, {selectedLocation: action.location})
    default:
      return defaultState
  }
}

export default locationsReducer
