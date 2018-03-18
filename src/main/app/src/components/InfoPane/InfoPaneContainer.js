import { connect } from 'react-redux'

import InfoPane from './InfoPane'
import { updateSelectedLocation, updateSelectedRoom } from '../../actions/locationActions'


const mapStateToProps = state => ({
  locations: Object.keys(state.locations.allLocations).map(key => state.locations.allLocations[key]),
  interiors: state.locations.interiors ? Object.keys(state.locations.interiors).map(key => state.locations.interiors[key]) : null,
  selectedLocation: state.locations.selectedLocation,
  selectedRoom: state.locations.selectedRoom,
  router: state.router
})

const mapDispatchToProps = dispatch => ({
  updateSelectedLocation: (location) => dispatch(updateSelectedLocation(location)),
  updateSelectedRoom: (room) => dispatch(updateSelectedRoom(room))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoPane)
