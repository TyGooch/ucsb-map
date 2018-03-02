import { connect } from 'react-redux'

import SideBar from './SideBar'
import { toggleSideBar } from '../../actions/sideBarActions'


const mapStateToProps = state => ({
  sideBarOpened: state.sideBar.sideBarOpened
})

const mapDispatchToProps = dispatch => ({
  toggleSideBar: () => dispatch(toggleSideBar())
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar)
