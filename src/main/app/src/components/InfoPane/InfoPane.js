import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Swipeable from 'react-swipeable'

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
  
  handleScroll(e) {
    // e.preventDefault()
    // alert('hello')
    // this.el.scrollIntoView()
    if (e.nativeEvent.wheelDelta > 0) {
     console.log('scroll up');
     // alert('up')
     this.el.scrollIntoView()
    } else {
      this.top.scrollIntoView()
     console.log('scroll down');
    }
  }
  
  swipedUp(e, deltaY, isFlick) {
    this.el.scrollIntoView()
  }
  
  swipedDown(e, deltaY, isFlick) {
    this.top.scrollIntoView()
  }

  render() {
    let margin = `${window.innerHeight - 250}px`
    // if((this.isMobile) && !(window.iOS && window.isSafari))
    //   margin = 'calc((100vmax - 250px))'
    // if((window.iOS && window.isSafari))
    //   margin = 'calc((100vmax - 250px))'
      
    let style = {
      display: this.isVisible ? 'block' : 'none',
      width: this.isMobile ? '100%' : '375px',
      // height: this.isMobile ? '100vmax' : '100vmax',
      height: window.innerHeight,
      top: this.isMobile ? null : 0,
      // bottom: this.isMobile ? 0 : null,
      marginTop: margin,
      zIndex: this.isMobile ? 1003 : 1001
      // paddingTop: (this.isMobile && !this.hasImage) ? '65px' : null,
    }
    console.log(this.isVisible);
    
    return (
      <div className="infopane-container" style={
        {
          display: this.isVisible ? 'block' : 'none',
          width: this.isMobile ? '100%' : '375px',
          // paddingTop: (this.isMobile && !this.hasImage) ? '35px' : null,
        }
      }>
      <div className='top' style={{position: 'absolute', top:'0px', height:'auto'}} ref={el => { this.top = el; }}>top</div>
        <Swipeable className="menu" style={style} onWheel={e => this.handleScroll(e)} onSwipedUp={this.swipedUp.bind(this)} onSwipedDown={this.swipedDown.bind(this)} >
          <div className = 'popup-header' style={{top: (this.isMobile || this.hasImage) ? '0px' : null }}>
            {this.getImage()}
            <div className = 'popup-header-text' style={{marginTop: (this.hasImage || this.isMobile) ? '0px' : '65px'}}>
              {!this.hasImage ? this.getName() : null}
              {this.getCategory()}
            </div>
          </div>
          <div className='bottom' style={{position: 'absolute', bottom:'0px', height:'auto'}} ref={el => { this.el = el; }}></div>
        </Swipeable>
      </div>
    )
  }
}

export default InfoPane