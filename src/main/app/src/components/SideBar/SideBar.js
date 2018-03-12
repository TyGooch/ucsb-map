import React, { Component } from 'react'
import Toggle from 'react-toggle'

import './sideBar.css'

class SideBar extends Component {
  render() {
    return (
      <div className="sidebar-container" style={this.props.sideBarOpened ? {display: 'block'} : {display: 'none'}} >
        <div className="sidebar-header">
          <img className='sidebar-logo' src='https://preview.ibb.co/dSeKTH/ucsb_map_logo.png' alt='logo' />
          <div className='sidebar-collapse-button' onClick={this.props.toggleSideBar}>
            <img className='sidebar-collapse-button-image' src='https://freevector.co/wp-content/uploads/2013/06/60769-rewind-double-arrows-angles.png' alt='collapse' />
          </div>
        </div>
        <div className="sidebar-content">
          <label>
            <span>Satellite Imagery</span>
            <Toggle
              defaultChecked={this.props.satelliteBasemapActive}
              onChange={this.props.toggleSatellite} />
          </label>
        </div>
      </div>
    )
  }
}

export default SideBar