import { connect } from 'react-redux'

import SideBar from './SideBar'
import { toggleSideBar, toggleSatellite } from '../../actions/sideBarActions'


const mapStateToProps = state => ({
  sideBarOpened: state.sideBar.sideBarOpened,
  satelliteBasemapActive: state.sideBar.satelliteBasemapActive
})

const mapDispatchToProps = dispatch => ({
  toggleSideBar: () => dispatch(toggleSideBar()),
  toggleSatellite: () => dispatch(toggleSatellite())
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar)
