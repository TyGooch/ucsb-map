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

  render() {
    let style = {
      display: this.props.selectedLocation ? 'block' : 'none',
      width: window.innerWidth < 600 ? '100vmin' : '375px',
      height: window.innerWidth < 600 ? '150px' : '100vmax',
      top: window.innerWidth < 600 ? null : 0,
      bottom: window.innerWidth < 600 ? 0 : null,
      paddingTop: window.innerWidth < 600 ? '5px' : '75px',
    }
    return (
      <div className="menu" style={style}>
        {this.props.selectedLocation ? this.props.selectedLocation.name : "none selected"}
      </div>
    )
  }
}

export default Menu