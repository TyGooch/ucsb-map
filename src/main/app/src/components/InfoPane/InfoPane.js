import React, { Component } from 'react'

import './infoPane.css'

class InfoPane extends Component {
  constructor() {
    super()
  }
  
  getName() {
    if(!this.props.selectedLocation)
      return
    return(
      <div className="popup-header-name" style={{paddingTop: window.innerWidth < 600 ? '15px' : '0px'}}>
      {this.props.selectedLocation ? this.props.selectedLocation.name : ""}
      </div>
    )
  }
  
  getCategory() {
    if(this.props.selectedLocation) {
      return(
        <span className='popup-header-category'>
          {this.props.selectedLocation.category[0].toUpperCase() + this.props.selectedLocation.category.substr(1,this.props.selectedLocation.category.length)}
        </span>
      )
    }
  }

  render() {
    let style = {
      display: this.props.selectedLocation ? 'block' : 'none',
      width: window.innerWidth < 600 ? '100vmin' : '375px',
      height: window.innerWidth < 600 ? '150px' : '100vmax',
      top: window.innerWidth < 600 ? null : 0,
      bottom: window.innerWidth < 600 ? 0 : null,
      paddingTop: window.innerWidth < 600 ? '5px' : '65px',
    }
    return (
      <div className="menu" style={style}>
        <div className = 'popup-header'>
          {this.getName()}
          {this.getCategory()}
        </div>
      </div>
    )
  }
}

export default InfoPane