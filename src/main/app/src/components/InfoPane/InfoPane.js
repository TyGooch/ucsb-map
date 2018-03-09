import React, { Component } from 'react'
import Swipeable from 'react-swipeable'

import './infoPane.css'

class InfoPane extends Component {
  constructor() {
    super()
    
    this.state = {
      isVisible: null
    }
    
    this.selectedLocation = null
    this.isMobile = null
    this.isVisible = null
    this.hasImage = null    
  }
  
  componentDidMount() {
    this.selectedLocation = this.props.selectedLocation
    this.isMobile = window.innerWidth < 800
    this.isVisible = this.props.selectedLocation && !this.isMobile ? true : false

    if(this.selectedLocation)
      this.hasImage = this.props.selectedLocation.image ? true : false
  }
  
  componentWillReceiveProps(nextProps) {
    this.selectedLocation = nextProps.selectedLocation
    
    this.isMobile = window.innerWidth < 800
    this.isVisible = nextProps.selectedLocation && !this.isMobile ? true : false
    
    if(this.selectedLocation)
      this.hasImage = nextProps.selectedLocation.image ? true : false

    if(!this.selectedLocation && this.state.isVisible)
      this.setState({isVisible: false})

    if(this.selectedLocation && !this.isMobile)
      this.setState({isVisible: true})
  }
  
  getImage() {
    if(!this.hasImage){
      if(this.isMobile)
        return(<div className='infopane-buffer-mobile'></div>)
      return
    }
      
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
        <img className="popup-header-image" src={this.selectedLocation ? this.selectedLocation.image : null} alt='location'/>
        <div className="popup-header-image-name">
          {this.getName()}
        </div>
      </div>
    )
  }
  
  getName() {
    if(!this.selectedLocation)
      return
      
    return(
      <div className="popup-header-name" style={{paddingTop: this.isMobile && !this.hasImage ? '5px' : '5px'}}>
        {this.selectedLocation.name}
      </div>
    )
  }
  
  getCategory() {
    if(this.selectedLocation) {
      return(
        <span className='popup-header-category'>
          {this.selectedLocation.details}
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
    // this.el.scrollIntoView()
    this.setState({isVisible: true})
  }
  
  swipedDown(e, deltaY, isFlick) {
    // this.el.scrollIntoView()
    if(!this.isMobile)
      return
    this.setState({isVisible: false})
  }
  
  render() {
    // let margin = `${window.innerHeight - 100}px`
    // if((this.isMobile) && !(window.iOS && window.isSafari))
    //   margin = 'calc((100vmax - 250px))'
    // if((window.iOS && window.isSafari))
    //   margin = 'calc((100vmax - 250px))'
      
    let style = {
      height: this.state && this.state.isVisible ? window.innerHeight : '0px',
      width: this.isMobile ? '100%' : '375px',
      zIndex: this.isMobile ? 1006 : 1001
      // paddingTop: (this.isMobile && !this.hasImage) ? '65px' : null,
    }
    console.log(this.state.isVisible);
    if(!this.state)
      return
    return (
        <div className='infopane-container' style={{zIndex: this.isMobile ? 1006 : 1001}}>
          <Swipeable
            className="infopane"
            style={style}
            // onSwipedDown={this.swipedDown.bind(this)}
            onSwipedLeft={this.swipedDown.bind(this)}
          >
            <div className = 'popup-header' style={{top: (this.isMobile || this.hasImage) ? '0px' : null }}>
              <div className="infopane-close-button" onClick={this.swipedDown.bind(this)} style={{display: this.isMobile ? 'block' : 'none'}}>
                <img className="infopane-close-button-image" src='https://www.materialui.co/materialIcons/navigation/arrow_back_white_192x192.png' alt='close-infopane' />
              </div>
              {this.getImage()}
              <div className = 'popup-header-text' style={{marginTop: (this.hasImage || this.isMobile) ? '0px' : '65px'}}>
                {!this.hasImage ? this.getName() : null}
                {this.getCategory()}
              </div>
            </div>
          </Swipeable>
          <Swipeable 
            className='mobile-info'
            style={{display: (this.isMobile && this.selectedLocation && !this.state.isVisible) ? 'block' : 'none'}}
            onSwipedUp={this.swipedUp.bind(this)}
          >
            <div className='mobile-info-open-button-container'>
              <div className='mobile-info-open-button' onClick={this.swipedUp.bind(this)}>
                <img className='mobile-info-open-button-icon' src='https://png.icons8.com/metro/48/ffffff/chevron-up.png' alt='open-infopane' />
              </div>
            </div>
            <div className='mobile-info-text'>
              <div className="mobile-info-name" style={{paddingTop: this.isMobile && !this.hasImage ? '5px' : '5px'}}>
                {this.selectedLocation ? this.selectedLocation.name : ''}
              </div>
              <span className='mobile-info-category'>
                {this.selectedLocation ? this.selectedLocation.details : ''}
              </span>
            </div>
          </Swipeable>
        </div>
    )
  }
}

export default InfoPane