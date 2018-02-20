import { connect } from 'react-redux'

import CampusMap from './CampusMap'

const mapStateToProps = state => ({
  locations: Object.keys(state.locations).map(key => state.locations[key])
})

export default connect(
  mapStateToProps
)(CampusMap)