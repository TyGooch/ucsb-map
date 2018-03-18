import merge from 'lodash/merge'

import {
  RECEIVE_LOCATIONS,
  RECEIVE_INTERIORS,
  UPDATE_SELECTED_LOCATION
} from '../actions/locationActions'

const defaultState = Object.freeze({
  allLocations: [],
  selectedLocation: null,
  interiors: []
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
          newLocation.website = location.website ? location.website : null
          newLocation.image = location.image ? location.image : null
          newLocation.details = location.details ? location.details : null
          newLocation.shortName = location.shortName ? location.shortName : null

          newLocations.push(newLocation)
        })

        return merge({}, state, {allLocations: newLocations})
      }
      return state
    case RECEIVE_INTERIORS:
      let newInteriors = {}
      action.interiors.forEach(interior => {
        newInteriors[interior.level] = newInteriors[interior.level] ? newInteriors[interior.level] : []
        let newInterior = {}
        newInterior.name = interior.name
        newInterior.building = interior.building
        newInterior.polygons = JSON.parse(interior.polygons)
        newInterior.level = interior.level

        newInteriors[interior.level].push(newInterior)
      })

      return merge({}, state, {interiors: newInteriors})
    case UPDATE_SELECTED_LOCATION:
      return merge({}, state, {selectedLocation: action.location})
    default:
      return state
  }
}

export default locationsReducer
