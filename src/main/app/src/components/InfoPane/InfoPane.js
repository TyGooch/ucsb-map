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


    // if(!roomStr && this.props.selectedRoom){
    //   this.props.updateSelectedRoom(null)
    // }
  }

  componentDidMount() {
    let pathArr = this.props.router.location.pathname.replace('/', '').split('/')
    let locationStr = pathArr[0]
    let roomStr = pathArr[1]
    let currentLocationName = locationStr.replace(/[^a-z0-9+]+/gi, '').toLowerCase()
    let currentLocation = this.props.locations.find(location => location.name.replace(/[^a-z0-9+]+/gi, '').toLowerCase() === currentLocationName )
    if(!currentLocation)
      currentLocation = this.props.locations.find(location => location.shortName && location.shortName.replace(/[^a-z0-9+]+/gi, '').toLowerCase() === currentLocationName )
    if(currentLocation){
      if(!(this.props.selectedLocation && this.props.selectedLocation.name === currentLocation.name)){
        this.setState({hasImage: currentLocation.image ? true : false})
        this.props.updateSelectedLocation(currentLocation)
      }
    }
    console.log(roomStr);
    if(roomStr && this.props.interiors && !this.props.selectedRoom){
      let rooms = []
      this.props.interiors.forEach(floor => {
        if(floor)
          floor.forEach(room => rooms.push(room))
      })
      let selectedRoom = null
      rooms.forEach(room => {
        if(room.name.toLowerCase() === `${currentLocation.shortName.toLowerCase()} ${roomStr.toLowerCase()}`)
          selectedRoom = room
      })
      if(selectedRoom)
        this.props.updateSelectedRoom(selectedRoom)
    }
  }

  componentWillUnmount(){
    if(this.props.selectedLocation)
      this.props.updateSelectedLocation(null)
    if(this.props.selectedRoom)
      this.props.updateSelectedRoom(null)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.router.location.pathname === nextProps.router.location.pathname && nextProps.selectedLocation && nextProps.selectedRoom) {
      return
    }
    if(this.props.router.location.pathname === '/' || nextProps.router.location.pathname === '/')
      return

    let pathArr = nextProps.router.location.pathname.replace('/', '').split('/')
    let locationStr = pathArr[0]
    let roomStr = pathArr[1]
    let currentLocationName = locationStr.replace(/[^a-z0-9+]+/gi, '').toLowerCase()
    let currentLocation = nextProps.locations.find(location => location.name.replace(/[^a-z0-9+]+/gi, '').toLowerCase() === currentLocationName )
    if(!currentLocation)
      currentLocation = nextProps.locations.find(location => location.shortName && location.shortName.replace(/[^a-z0-9+]+/gi, '').toLowerCase() === currentLocationName )
    if(currentLocation){
      if(!(nextProps.selectedLocation && nextProps.selectedLocation.name === currentLocation.name)){
        this.setState({hasImage: currentLocation.image ? true : false})
        this.props.updateSelectedLocation(currentLocation)
      }
    }
    if(roomStr && nextProps.interiors){
      let rooms = []
      nextProps.interiors.forEach(floor => {
          floor.forEach(room => rooms.push(room))
      })
      let selectedRoom = this.props.selectedRoom ? this.props.selectedRoom : null
      rooms.forEach(room => {
        // console.log(room.name.replace(/ /g, '').toLowerCase());
        // console.log(`${currentLocation.shortName}${roomStr}`.replace(/ /g, '').toLowerCase());
        if(room.name.replace(/ /g, '').toLowerCase() === `${currentLocation.shortName}${roomStr}`.replace(/ /g, '').toLowerCase())
          selectedRoom = room
      })
      console.log(selectedRoom);
      if(selectedRoom)
        this.props.updateSelectedRoom(selectedRoom)
    }
    if(!roomStr && this.props.selectedRoom){
      this.props.updateSelectedRoom(null)
    }

    // if(!nextProps.selectedLocation)
    //   return
  }

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

  getDescription() {
    if(this.props.selectedLocation) {
      return(
        <div className='popup-header-category'>
          {this.props.selectedLocation.details}
        </div>
      )
    }
  }

  getWebsite() {
    if(this.props.selectedLocation && this.props.selectedLocation.website) {
      return(
        <a className='infopane-website-container' href={this.props.selectedLocation.website}>
          <span className='infopane-website-image-container'>
            <img src='https://www.sfcg.org/wp-content/uploads/2016/12/link-icon-white.png' alt='website' className='infopane-website-image'/>
          </span>
          <span className='infopane-website-text'>
            {this.props.selectedLocation.website.replace('http://','').replace('https://','').split('/')[0]}
          </span>
        </a>
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
      height: this.props.selectedLocation && this.state && this.state.isVisible ? window.innerHeight : '0px',
      width: this.state.isMobile ? '100%' : '375px',
      zIndex: this.state.isMobile ? 1010 : 1001
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
              <div className="popup-header-text" style={{marginTop: (hasImage || this.state.isMobile) ? '0px' : '65px'}}>
                {!hasImage ? this.getName() : null}
                {this.getDescription()}
              </div>
            </div>
            <div className='infopane-body'>
                {this.getWebsite()}
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
