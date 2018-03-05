import React, { Component } from 'react'

import './infoPane.css'

class InfoPane extends Component {
  constructor() {
    super()
    let isMobile = null
    let isVisible = false
    let hasImage = false
    
    this.isVisible = isVisible    
  }
  
  componentDidMount() {
    this.isVisible = this.props.selectedLocation ? true : false
    this.isMobile = window.innerWidth < 800

    if(this.isVisible)
      this.hasImage = this.props.selectedLocation.image ? true : false
  }
  
  componentWillReceiveProps(nextProps) {
    this.isMobile = window.innerWidth < 800
    this.isVisible = nextProps.selectedLocation ? true : false

    if(this.isVisible)
      this.hasImage = nextProps.selectedLocation.image ? true : false
  }
  
  getImage() {
    if(!this.hasImage)
      return
      
    let style = {}
    if(this.isMobile){
      style = {
        // position: 'absolute',
        // bottom: '1px',
        // right: '1px',
        height: '200px',
        // width: 'inherit'
      }
    }
      
    return(
      <div className="popup-header-image-container" style={style}>
        <img className="popup-header-image" src={this.props.selectedLocation ? this.props.selectedLocation.image : null} alt='location-image'/>
        <div className="popup-header-image-name">
          {this.getName()}
        </div>
      </div>
    )
  }
  
  getName() {
    if(!this.isVisible)
      return
      
    return(
      <div className="popup-header-name" style={{paddingTop: this.isMobile && !this.hasImage ? '25px' : '5px'}}>
        {this.props.selectedLocation ? this.props.selectedLocation.name : ""}
      </div>
    )
  }
  
  getCategory() {
    if(this.isVisible) {
      return(
        <span className='popup-header-category'>
          {this.props.selectedLocation.category[0].toUpperCase() + this.props.selectedLocation.category.substr(1,this.props.selectedLocation.category.length)}
        </span>
      )
    }
  }

  render() {
    let style = {
      display: this.isVisible ? 'block' : 'none',
      width: this.isMobile ? '100%' : '375px',
      height: this.isMobile ? '250px' : '100vmax',
      top: this.isMobile ? null : 0,
      bottom: this.isMobile ? 0 : null,
      // paddingTop: (this.hasImage && this.isMobile) ? '0px' : '65px',
    }
    console.log(this.isVisible);
    
    return (
      <div className="menu" style={style}>
        <div className = 'popup-header' style={{top: (this.isMobile || !this.hasImage) ? '0px' : null }}>
          {this.getImage()}
          <div className = 'popup-header-text' style={{marginTop: (this.hasImage || this.isMobile) ? '0px' : '65px'}}>
            {!this.hasImage ? this.getName() : null}
            {this.getCategory()}
          </div>
        </div>
      </div>
    )
  }
}

export default InfoPane