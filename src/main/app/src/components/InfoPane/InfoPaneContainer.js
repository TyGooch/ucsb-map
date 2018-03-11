import { connect } from 'react-redux'

import InfoPane from './InfoPane'
import { updateSelectedLocation } from '../../actions/locationActions'


const mapStateToProps = state => ({
  locations: Object.keys(state.locations.allLocations).map(key => state.locations.allLocations[key]),
  selectedLocation: state.locations.selectedLocation,
  router: state.router
})

const mapDispatchToProps = dispatch => ({
  updateSelectedLocation: (location) => dispatch(updateSelectedLocation(location))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoPane)
