import merge from 'lodash/merge'

import {
  RECEIVE_LOCATIONS
} from '../actions/locationActions'

const locationsReducer = (state = [], action) => {
  Object.freeze(state)
  let newState = merge([], state)

  switch(action.type) {
    case RECEIVE_LOCATIONS:
      if(!state[0]){
        let newLocations = []
        action.locations.forEach(location => {
          let newLocation = {}
          newLocation.name = location.name
          newLocation.category = location.category
          newLocation.polygons = JSON.parse(location.polygons)
          
          newLocations.push(newLocation)
        })
        
        return newLocations
      }
    default:
      return state
  }
}

export default locationsReducer
