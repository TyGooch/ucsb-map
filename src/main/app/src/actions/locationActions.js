import * as APIUtil from '../util/locationAPIUtil'

export const RECEIVE_LOCATIONS = 'RECEIVE_LOCATIONS'
export const RECEIVE_INTERIORS = 'RECEIVE_INTERIORS'
export const UPDATE_SELECTED_LOCATION = 'UPDATE_SELECTED_LOCATION'

export const receiveLocations = locations => ({
  type: RECEIVE_LOCATIONS,
  locations
})

export const receiveInteriors = interiors => ({
  type: RECEIVE_INTERIORS,
  interiors
})

export const changeSelectedLocation = location => ({
  type: UPDATE_SELECTED_LOCATION,
  location
})

export const fetchLocations = () => dispatch => (
  APIUtil.fetchLocations().then(locations => (
    dispatch(receiveLocations(locations))
  ))
)

export const fetchInteriors = () => dispatch => (
  APIUtil.fetchInteriors().then(interiors => (
    dispatch(receiveInteriors(interiors))
  ))
)

export const updateSelectedLocation = (location) => (dispatch) => {
  dispatch(changeSelectedLocation(location))
}
