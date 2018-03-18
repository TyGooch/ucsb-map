import { connect } from 'react-redux'

import { fetchLocations, fetchInteriors } from '../../actions/locationActions'
import { toggleSideBar } from '../../actions/sideBarActions'
import App from './App'

const mapStateToProps = state => ({
  sideBarOpened: state.sideBar.sideBarOpened
})


const mapDispatchToProps = dispatch => ({
  fetchLocations: () => dispatch(fetchLocations()),
  fetchInteriors: () => dispatch(fetchInteriors()),
  toggleSideBar: () => dispatch(toggleSideBar())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
