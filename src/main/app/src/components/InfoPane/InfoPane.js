import React, { Component } from 'react'
import Swipeable from 'react-swipeable'

import './infoPane.css'

class InfoPane extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      isMobile: (window.innerWidth < 800),
      isVisible: !(window.innerWidth < 800),
      hasImage: false
    }
    
    console.log('MOUNT');
    let currentLocationName = props.router.location.pathname.replace('/', '')
    let currentLocation = props.locations.find(location => location.name.replace(/ /g, "") === currentLocationName )
    if(!currentLocation)
      currentLocation = props.locations.find(location => location.shortName && location.shortName.replace(/ /g, "") === currentLocationName )
    if(currentLocation){
      props.updateSelectedLocation(currentLocation)  
    }
  }
  
  componentWillUnmount(){
    console.log('UNMOUNT');
    this.props.updateSelectedLocation(null)
  }
    
  componentWillReceiveProps(nextProps) {
    // debugger;
    console.log('update1');
    // console.log(hasImage);

    // console.log(this.props);
    // console.log(nextProps);
    // console.log(this.props.locations.length === nextProps.locations.length);
    if(this.props.router.location === nextProps.router.location && this.props.locations.length === nextProps.locations.length ) {
      return
    }
    console.log('update2');
      let currentLocationName = nextProps.router.location.pathname.replace('/', '')
      let currentLocation = nextProps.locations.find(location => location.name.replace(/ /g, "") === currentLocationName )
      if(!currentLocation)
        currentLocation = nextProps.locations.find(location => location.shortName && location.shortName.replace(/ /g, "") === currentLocationName )
      if(currentLocation){
        this.props.updateSelectedLocation(currentLocation)
        this.setState({hasImage: currentLocation.image ? true : false})
      }
    // }
    console.log('here');
    if(!nextProps.selectedLocation)
      return

    // if(hasImage !== (nextProps.selectedLocation.image === null ? false : true))
    //   this.setState({hasImage: nextProps.selectedLocation.image === null ? false : true})
    
    // if(!hasImage && nextProps.selectedLocation.image)
    //   this.setState({hasImage: true})
    // 
    // if(!this.props.selectedLocation && this.state.isVisible)
    //   this.setState({isVisible: false})
    // 
    // if(this.props.selectedLocation && !this.state.isMobile)
    //   this.setState({isVisible: true})
  }
  
  // shouldComponentUpdate(nextProps){
  //   console.log('SHOULD')
  //   if(this.props.router.location.pathname !== nextProps.router.location.pathname)
  //     return true
  //   return false
  // }
  
  getImage() {
    let hasImage = this.props.selectedLocation && !(this.props.selectedLocation.image === null)
    if(!hasImage){
      if(this.state.isMobile)
        return(<div className='infopane-buffer-mobile'></div>)
      return
    }
      
    let style = {}
    if(this.state.isMobile){
      style = {
        height: '200px'
      }
    }
      
    return(
      <div className="popup-header-image-container" style={style}>
        <img className="popup-header-image" src={this.props.selectedLocation ? this.props.selectedLocation.image : null} alt='location'/>
        <div className="popup-header-image-name">
          {this.getName()}
        </div>
      </div>
    )
  }
  
  getName() {
    if(!this.props.selectedLocation)
      return
    let hasImage = !(this.props.selectedLocation.image === null)
      
    return(
      <div className="popup-header-name" style={{paddingTop: this.state.isMobile && !hasImage ? '5px' : '5px'}}>
        {this.props.selectedLocation.name}
      </div>
    )
  }
  
  getCategory() {
    if(this.props.selectedLocation) {
      return(
        <span className='popup-header-category'>
          {this.props.selectedLocation.details}
        </span>
      )
    }
  }
    
  swipedUp(e, deltaY, isFlick) {
    this.setState({isVisible: true})
  }
  
  swipedDown(e, deltaY, isFlick) {
    if(!this.state.isMobile)
      return
    this.setState({isVisible: false})
  }
  
  render() {
    let hasImage = this.props.selectedLocation && !(this.props.selectedLocation.image === null)      
    let style = {
      height: this.state && this.state.isVisible ? window.innerHeight : '0px',
      width: this.state.isMobile ? '100%' : '375px',
      zIndex: this.state.isMobile ? 1006 : 1001
    }
    return (
        <div className='infopane-container' style={{zIndex: this.state.isMobile ? 1006 : 1001}}>
          <Swipeable
            className="infopane"
            style={style}
            onSwipedRight={this.swipedDown.bind(this)}
          >
            <div className = 'popup-header' style={{top: (this.state.isMobile || hasImage) ? '0px' : null }}>
              <div className="infopane-close-button" onClick={this.swipedDown.bind(this)} style={{display: this.state.isMobile ? 'block' : 'none'}}>
                <img className="infopane-close-button-image" src='https://www.materialui.co/materialIcons/navigation/arrow_back_white_192x192.png' alt='close-infopane' />
              </div>
              {this.getImage()}
              <div className = 'popup-header-text' style={{marginTop: (hasImage || this.state.isMobile) ? '0px' : '65px'}}>
                {!hasImage ? this.getName() : null}
                {this.getCategory()}
              </div>
            </div>
          </Swipeable>
          <Swipeable 
            className='mobile-info'
            style={{display: (this.state.isMobile && !this.state.isVisible) ? 'block' : 'none'}}
            onSwipedUp={this.swipedUp.bind(this)}
          >
            <div className='mobile-info-open-button-container'>
              <div className='mobile-info-open-button' onClick={this.swipedUp.bind(this)}>
                <img className='mobile-info-open-button-icon' src='https://png.icons8.com/metro/48/ffffff/chevron-up.png' alt='open-infopane' />
              </div>
            </div>
            <div className='mobile-info-text'>
              <div className="mobile-info-name" style={{paddingTop: this.state.isMobile && !hasImage ? '5px' : '5px'}}>
                {this.props.selectedLocation ? this.props.selectedLocation.name : ''}
              </div>
              <span className='mobile-info-category'>
                {this.props.selectedLocation ? this.props.selectedLocation.details : ''}
              </span>
            </div>
          </Swipeable>
        </div>
    )
  }
}

export default InfoPane