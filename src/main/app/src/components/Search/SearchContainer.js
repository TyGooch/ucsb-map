import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Search from './Search'
import { updateSelectedLocation } from '../../actions/locationActions'
import { toggleSideBar } from '../../actions/sideBarActions'


const mapStateToProps = state => ({
  locations: Object.keys(state.locations.allLocations).map(key => state.locations.allLocations[key]),
  interiors: state.locations.interiors ? Object.keys(state.locations.interiors).map(key => state.locations.interiors[key]) : null,
  selectedLocation: state.locations.selectedLocation
})

const mapDispatchToProps = dispatch => ({
  updateSelectedLocation: (location) => dispatch(updateSelectedLocation(location)),
  toggleSideBar: () => dispatch(toggleSideBar()),
  selectLocation: (name) => dispatch(push(`/${name.replace(/[^/a-z0-9+]+/gi, '').toLowerCase()}`)),
  deselectLocation: () => dispatch(push('/'))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
