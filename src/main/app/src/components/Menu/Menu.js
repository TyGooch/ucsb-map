import React, { Component } from 'react'

import './menu.css'

class Menu extends Component {
  constructor() {
    super()

    this.state = {
      value: '',
      suggestions: [],
      clickedClear: null,
      selectedSuggestion: null
    }
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
          {this.props.selectedLocation ? this.props.selectedLocation.name : ""}
          <br />
          {this.getCategory()}
        </div>
      </div>
    )
  }
}

export default Menu