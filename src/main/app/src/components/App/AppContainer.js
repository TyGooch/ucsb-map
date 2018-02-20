import { connect } from 'react-redux'

import { fetchLocations } from '../../actions/locationActions'
import App from './App'

const mapDispatchToProps = dispatch => ({
  fetchLocations: () => dispatch(fetchLocations())
})

export default connect(
  null,
  mapDispatchToProps
)(App)
