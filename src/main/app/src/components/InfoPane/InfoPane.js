import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Swipeable from 'react-swipeable'

import './infoPane.css'

class InfoPane extends Component {
  constructor() {
    super()
    
    this.state = {
      isVisible: null
    }
    
    let selectedLocation = null
    let isMobile = null
    let isVisible = false
    let hasImage = false
    
    this.isVisible = isVisible    
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
        <img className="popup-header-image" src={this.selectedLocation ? this.selectedLocation.image : null} alt='location-image'/>
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
    let margin = `${window.innerHeight - 250}px`
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
            onSwipedDown={this.swipedDown.bind(this)}
            onClick={this.swipedDown.bind(this)}
          >
            <div className = 'popup-header' style={{top: (this.isMobile || this.hasImage) ? '0px' : null }}>
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
            onClick={this.swipedUp.bind(this)}
          >
            {this.getName()}
            {this.getCategory()}
          </Swipeable>
        </div>
    )
  }
}

export default InfoPane