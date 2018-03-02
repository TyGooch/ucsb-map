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
      <div className="popup-header-name" style={{paddingTop: window.innerWidth < 800 ? '15px' : '0px'}}>
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
      width: window.innerWidth < 800 ? '100%' : '375px',
      height: window.innerWidth < 800 ? '150px' : '100vmax',
      top: window.innerWidth < 800 ? null : 0,
      bottom: window.innerWidth < 800 ? 0 : null,
      paddingTop: window.innerWidth < 800 ? '5px' : '65px',
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