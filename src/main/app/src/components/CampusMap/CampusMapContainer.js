import { connect } from 'react-redux'
import { push, replace } from 'react-router-redux'

import CampusMap from './CampusMap'
import { updateSelectedLocation } from '../../actions/locationActions'


const mapStateToProps = state => ({
  locations: Object.keys(state.locations.allLocations).map(key => state.locations.allLocations[key]),
  selectedLocation: state.locations.selectedLocation
})

const mapDispatchToProps = dispatch => ({
  updateSelectedLocation: (location) => dispatch(updateSelectedLocation(location)),
  selectLocation: (name) => dispatch(push(`/location/${name.replace(/ /g, "")}`)),
  deselectLocation: () => dispatch(replace('/'))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampusMap)
