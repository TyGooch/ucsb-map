import { connect } from 'react-redux'

import Search from './Search'
import { updateSelectedLocation } from '../../actions/locationActions'


const mapStateToProps = state => ({
  locations: Object.keys(state.locations.allLocations).map(key => state.locations.allLocations[key])
})

const mapDispatchToProps = dispatch => ({
  updateSelectedLocation: (location) => dispatch(updateSelectedLocation(location))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
