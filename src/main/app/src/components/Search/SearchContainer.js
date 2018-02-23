import { connect } from 'react-redux'

import Search from './Search'

const mapStateToProps = state => ({
  locations: Object.keys(state.locations).map(key => state.locations[key])
})

export default connect(
  mapStateToProps
)(Search)
