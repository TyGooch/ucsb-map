import React, { Component } from 'react'

import './sideBar.css'

class SideBar extends Component {
  constructor() {
    super()
  }
  
  render() {
    return (
      <div className="sidebar-container" style={this.props.sideBarOpened ? {display: 'block'} : {display: 'none'}} >
        <div className="sidebar-header">
          <img className='sidebar-logo' src='https://preview.ibb.co/dSeKTH/ucsb_map_logo.png' alt='logo' />
          <div className='sidebar-collapse-button' onClick={this.props.toggleSideBar}>
            <img className='sidebar-collapse-button-image' src='http://freevector.co/wp-content/uploads/2013/06/60769-rewind-double-arrows-angles.png' alt='collapse' />
          </div>
        </div>
        <div className="sidebar-content">
          CONTROLS GO HERE
        </div>
      </div>
    )
  }
}

export default SideBar