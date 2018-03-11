import React, { Component } from 'react'
import Swipeable from 'react-swipeable'

import './infoPane.css'

class InfoPane extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      isMobile: (window.innerWidth < 800),
      isVisible: props.selectedLocation && !(window.innerWidth < 800),
      hasImage: (props.selectedLocation && props.selectedLocation.image ? true : false),
    }
  }
  
  componentWillUnmount(){
    console.log('UNMOUNT');
  }
  
  // componentWillMount() {
  //   console.log('MOUNT');
  //   if(!this.props.selectedLocation && this.props.locations){
  //     // debugger;
  //     let currentLocationName = this.props.router.location.pathname.replace('/location/', '')
  //     let currentLocation = this.props.locations.find(location => location.name.replace(/ /g, "") === currentLocationName)
  //     if(currentLocation){
  //       this.props.updateSelectedLocation(currentLocation)  
  //       this.setState({isVisible: true})
  //     }
  //   }
  // }
  
  componentWillReceiveProps(nextProps) {
    console.log('update');
    // console.log(this.props);
    // console.log(nextProps);
    if(nextProps.router.location.pathname !== this.props.router.location.pathname)
      return
      
    if(!this.props.selectedLocation){
      // debugger;
      let currentLocationName = this.props.router.location.pathname.replace('/location/', '')
      let currentLocation = nextProps.locations.find(location => location.name.replace(/ /g, "") === currentLocationName)
      if(currentLocation && !this.state.isVisible){
        this.props.updateSelectedLocation(currentLocation)  
        // this.setState({isVisible: true})
      }
      // return
    }
    // this.props.selectedLocation = nextProps.selectedLocation
    // let currentLocationName = this.props.router.location.pathname.replace('/location/', '')
    // let currentLocation = this.props.locations.find(location => location.name === currentLocationName)
    // if(currentLocation)
    //   this.props.updateSelectedLocation(currentLocation)
    
    // this.isVisible = nextProps.selectedLocation && !this.state.isMobile ? true : false
    // debugger
    
    if(!nextProps.selectedLocation)
      return

    if(this.state.hasImage && !(nextProps.selectedLocation.image))
      this.setState({hasImage: false})
    
    if(!this.state.hasImage && nextProps.selectedLocation.image)
      this.setState({hasImage: true})

    if(!this.props.selectedLocation && this.state.isVisible)
      this.setState({isVisible: false})

    if(this.props.selectedLocation && !this.state.isMobile)
      this.setState({isVisible: true})
  }
  
  componentDidUpdate(){
    
  }
  
  getImage() {
    if(!this.state.hasImage){
      if(this.state.isMobile)
        return(<div className='infopane-buffer-mobile'></div>)
      return
    }
      
    let style = {}
    if(this.state.isMobile){
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
      
    return(
      <div className="popup-header-name" style={{paddingTop: this.state.isMobile && !this.state.hasImage ? '5px' : '5px'}}>
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
    if(!this.state.isMobile)
      return
    this.setState({isVisible: false})
  }
  
  render() {
    // let margin = `${window.innerHeight - 100}px`
    // if((this.state.isMobile) && !(window.iOS && window.isSafari))
    //   margin = 'calc((100vmax - 250px))'
    // if((window.iOS && window.isSafari))
    //   margin = 'calc((100vmax - 250px))'
    // if(!this.state)
    //   return
      
    let style = {
      height: this.state && this.state.isVisible ? window.innerHeight : '0px',
      width: this.state.isMobile ? '100%' : '375px',
      zIndex: this.state.isMobile ? 1006 : 1001
      // paddingTop: (this.state.isMobile && !this.state.hasImage) ? '65px' : null,
    }
    return (
        <div className='infopane-container' style={{zIndex: this.state.isMobile ? 1006 : 1001}}>
          <Swipeable
            className="infopane"
            style={style}
            onSwipedRight={this.swipedDown.bind(this)}
          >
            <div className = 'popup-header' style={{top: (this.state.isMobile || this.state.hasImage) ? '0px' : null }}>
              <div className="infopane-close-button" onClick={this.swipedDown.bind(this)} style={{display: this.state.isMobile ? 'block' : 'none'}}>
                <img className="infopane-close-button-image" src='https://www.materialui.co/materialIcons/navigation/arrow_back_white_192x192.png' alt='close-infopane' />
              </div>
              {this.getImage()}
              <div className = 'popup-header-text' style={{marginTop: (this.state.hasImage || this.state.isMobile) ? '0px' : '65px'}}>
                {!this.state.hasImage ? this.getName() : null}
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
              <div className="mobile-info-name" style={{paddingTop: this.state.isMobile && !this.state.hasImage ? '5px' : '5px'}}>
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