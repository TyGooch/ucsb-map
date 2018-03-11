import * as APIUtil from '../util/locationAPIUtil'

export const RECEIVE_LOCATIONS = 'RECEIVE_LOCATIONS'
export const UPDATE_SELECTED_LOCATION = 'UPDATE_SELECTED_LOCATION'

export const receiveLocations = locations => ({
  type: RECEIVE_LOCATIONS,
  locations
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

export const updateSelectedLocation = (location) => (dispatch) => {
  dispatch(changeSelectedLocation(location))
}
