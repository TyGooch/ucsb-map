import React, { Component } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import config from './mapConfig.js'
import Spinner from 'react-spinkit'

import bikePath from '../../util/locationData/bikePath/bikePath.js'
import './campusMap.css'


class CampusMap extends Component {

  constructor(){
    super()

    this.state = {
      map: null,
      allowsLocation: null
    }

    this._mapNode = null
    this.polygons = null
    this.interiors = []
    this.userLocation = null
    this.mapControls = null
    this.basemap = null

    this.handleMapClick = this.handleMapClick.bind(this)
    this.handleMapZoom = this.handleMapZoom.bind(this)
  }

  componentDidMount(){
    if(!this.state.map)
      this.initializeMap(this._mapNode)
  }

  initializeMap(id) {
    if (this.state.map)
      return

    let map = L.map(id, config.mapOptions)
    map.on('click', this.handleMapClick)

    this.basemap = L.tileLayer(config.tileLayer.uri, config.tileLayer.options).addTo(map)

    map.createPane('labels')
    map.getPane('labels').style.zIndex = 750
    map.getPane('labels').style.pointerEvents = 'none'
    L.tileLayer('https://api.mapbox.com/styles/v1/tygooch/cjewg3skj2byn2rmrkvj5hvu0/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHlnb29jaCIsImEiOiJjamRkbDc2NmIwM2I1Mndxbzk0OTlxbHh5In0.pYzzyz9vm74G3pjt1FcX6w', {pane: 'labels', maxZoom:19, bounds: [[34.428988, -119.885195],[34.39854, -119.82454]]}).addTo(map)
    // L.tileLayer('https://api.mapbox.com/styles/v1/tygooch/cjew9uvd425zb2rmrozdt2j0k/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHlnb29jaCIsImEiOiJjamRkbDc2NmIwM2I1Mndxbzk0OTlxbHh5In0.pYzzyz9vm74G3pjt1FcX6w', {pane: 'interior-labels', minZoom: 19, bounds: [[34.428988, -119.885195],[34.39854, -119.82454]]}).addTo(map)

    map.createPane('interior-labels')
    map.getPane('interior-labels').style.zIndex = 751
    map.getPane('interior-labels').style.pointerEvents = 'none'
    L.tileLayer(config.floor1, {pane: 'interior-labels', minZoom:20, maxZoom:22,  bounds: [[34.428988, -119.885195],[34.39854, -119.82454]]}).addTo(map)

    map.getPane('tooltipPane').style.zIndex = 851

    this.addBikePath(map, bikePath)
    // this.addInteriors(map, interiors)

    map.on('zoomend ', this.handleMapZoom)
    this.setState({ map })
  }

  handleMapClick(e){
    if(e.originalEvent.target instanceof HTMLElement){
      if(this.props.selectedLocation){
        this.props.deselectLocation()
      }
    }
  }

  handleMapZoom(e){
    if ( this.state.map.getZoom() >= 19 ){ this.addInteriors()}
    else if ( this.state.map.getZoom() < 19 ){ this.removeInteriors()}
  }

  handlePolygonClick(location, polygon){
    this.props.selectLocation(location.shortName ? location.shortName : location.name)
  }

  handlePolygonMouseOver(e, location, polygon) {
    if(!(this.props.selectedLocation && location.name === this.props.selectedLocation.name)) {
      polygon.setStyle({ fillOpacity: 0.5})
    }
  }

  handlePolygonMouseOut(location, polygon) {
    let color = '#6DAAD0'
    if(location.category === 'Parking')
      color = '#555555'

    if(!(this.props.selectedLocation && location.name === this.props.selectedLocation.name)) {
      polygon.setStyle({color: color, fillColor: color, fillOpacity: 0.25})
    }
  }

  addPolygons(){
    let polygons = []
    this.props.locations.forEach(location => {
      let color = '#6DAAD0'
      if(location.category === 'Parking')
        color = '#555555'


      let polygon = L.polygon(location.polygons, {weight: location.category === 'Parking' ? 0 : 1, color: color, fillColor: color, fillOpacity: 0.25})
      polygon.on('click', () => {this.handlePolygonClick(location, polygon)})
      polygon.on('mouseover', (e) => {this.handlePolygonMouseOver(e, location, polygon)})
      polygon.on('mouseout', () => { this.handlePolygonMouseOut(location, polygon)})
      polygon.addTo(this.state.map)

      polygon.bindTooltip(`<p>${location.name}</p>`, {closeButton: false, sticky: true, direction: 'top', className:'hover-label'})

      if(this.props.selectedLocation && this.props.selectedLocation.name === location.name){
        polygon.setStyle({weight: 1, color: '#ebbd31', fillColor: '#ebbd31', fillOpacity: 0.5})
      }
      polygons.push({polygon: polygon, location: location})
    })

    this.polygons = polygons
  }

  removePolygons(){
    if(this.polygons)
      this.polygons.forEach(polygon => polygon.polygon.remove())
  }

  addBikePath(map, bikePath){
    bikePath.features.forEach(pathSegment => {
      L.geoJSON(pathSegment, {style: {weight:1, color: 'silver', opacity: 1, smoothFactor: 0.1}, interactive:false})
      .addTo(map);
    })
  }

  getUserLocation(){
    if(!this.state.map)
      return

    let map = this.state.map
    map.createPane('userLocation')
    map.getPane('userLocation').style.zIndex = 850
    map.getPane('userLocation').style.pointerEvents = 'none'

    map.locate({watch: true}).on('locationfound', e => {
      if(this.userLocation){
        this.userLocation.markers.forEach(marker => marker.remove())
      }

      var uncertaintyCircle = L.circle([e.latitude, e.longitude], {
          radius: e.accuracy/2,
          weight: 1,
          color: '#5384ec',
          opacity: 0.4,
          fillColor: '#5384ec',
          fillOpacity: 0.15,
          interactive: false
      })

      var outerUserLocationCircle = L.circleMarker([e.latitude, e.longitude], {
          radius: 7,
          weight: 2,
          color: 'white',
          fillColor: 'white',
          fillOpacity:1,
          pane:'userLocation',
          interactive: false
      })

      var pulsingCircleIcon = L.divIcon({
        className: 'pulse-icon-circle',
        html: '<div class="pulsing-circle"></div>',
        iconSize: [12, 12],
        interactive: false
      })
      var innerUserLocationCircle = L.marker([e.latitude, e.longitude], {icon: pulsingCircleIcon, pane:'userLocation', interactive: false})

      map.addLayer(uncertaintyCircle)
      map.addLayer(outerUserLocationCircle)
      map.addLayer(innerUserLocationCircle)

      if(!this.state.allowsLocation){
        this.setState({allowsLocation: true})
      }

      this.userLocation = {
        markers: [uncertaintyCircle, outerUserLocationCircle, innerUserLocationCircle],
        latlng: [e.latitude, e.longitude]
      }
    })
  }

  panToUserLocation(){
    this.state.map.setView(this.userLocation.latlng)
  }

  addUserLocationButton(){
    if(this.state.allowsLocation){
      let offset = {}
      if(this.props.selectedLocation){
        if(window.innerWidth < 800){
          offset={bottom: '107.5px'}
        }
      }
      return (
        <div className="location-button-container" onClick={this.panToUserLocation.bind(this)} style={offset}>
          <div className="location-button">
            <img src="https://d30y9cdsu7xlg0.cloudfront.net/png/34744-200.png" alt="locate" className="location-button-image"/>
          </div>
        </div>
      )
    }
  }

  loadSpinner(){
    if(this.state.map && this.props.locations.length === 0){
      return (
        <div className="spinner-container">
          <Spinner overrideSpinnerClassName="spinner" name="circle" color="#6DAAD0"/>
        </div>
      )
    }
  }

  pantoSelection(){
    if(this.props.selectedLocation){
      let map = this.state.map

      let selectedLocation = this.props.selectedLocation
      let selectedPolygon
      for (let {polygon, location} of this.polygons) {
        if(location.name === selectedLocation.name)
          selectedPolygon = polygon
      }

      let size = map.getSize()
      let newBound
      let bounds
      let padding
      if(size.x < 800){
        padding = [0,75]
        newBound = L.point(size.x, size.y - 125)
        bounds = L.latLngBounds(map.containerPointToLatLng(padding), map.containerPointToLatLng(newBound))
      } else {
        padding = [385,50]
        newBound = L.point(size.x - 50, size.y - 50)
        bounds = L.latLngBounds(map.containerPointToLatLng(padding), map.containerPointToLatLng(newBound))
      }

      console.log(map.getZoom());
      if(!bounds.contains(selectedPolygon.getBounds())){
        map.fitBounds(selectedPolygon.getBounds(),
          {
            paddingTopLeft: (size.x < 800 ? null : padding),
            paddingBottomRight: (size.x < 800 ? padding : null),
            maxZoom: (map.getZoom() > 17 ? map.getZoom() : 17),
            duration: 0.5
          }
        )
      } else {
        if(map.getZoom() < 17)
          map.fitBounds(selectedPolygon.getBounds(), {paddingTopLeft: padding, maxZoom: 17, })
      }
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.satelliteBasemapActive !== this.props.satelliteBasemapActive){
      nextProps.satelliteBasemapActive ? this.basemap.setUrl(config.satelliteLayer.uri) : this.basemap.setUrl(config.tileLayer.uri)
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.locations.length !== this.props.locations.length){
      this.addPolygons()
      // this.addInteriors()
    }
    if(prevProps.selectedLocation !== this.props.selectedLocation){
      // this.addInteriors()
      this.removePolygons()
      this.addPolygons()
      if(this.props.selectedLocation !== null)
        this.pantoSelection()
    }
  }

  addInteriors() {
    if(!this.props.interiors)
      return

    if(this.interiors.length > 0)
      return

    let interiors = []
    // Object.keys(this.props.interiors).forEach(level => {
    //   // map.createPane(`floor${level}Pane`)
    //   // map.getPane(`floor${level}Pane`).
    //   this.props.interiors[level].forEach(interior => {
    //     let polygon = L.polygon(interior.polygons, {weight: 1, color: "red", fillColor: "red", fillOpacity: 0.25})
    //     interiors.push(polygon)
    //     polygon.addTo(this.state.map)
    //   })
    // })
    this.props.interiors[1].forEach(interior => {
      let polygon = L.polygon(interior.polygons, {weight: 1, color: "grey", fillColor: "grey", fillOpacity: 0.25, interactive: false})
      // let label = new L.Marker(polygon.getBounds().getCenter(), {
      //   icon: new L.DivIcon({
      //       className: 'interior-label',
      //       html: `<span class="interior-label-text">${interior.name.split(' ').pop()}</span>`
      //   })
      // }).addTo(this.state.map)
      let label = null
      interiors.push({polygon: polygon, label: label})
      polygon.addTo(this.state.map)
      // polygon.bindTooltip(interior.name.split(' ').pop()).openTooltip()
    })

    this.interiors = interiors
  }

  removeInteriors() {
    if(this.interiors.length === 0 || !this.props.interiors)
      return
    this.interiors.forEach(interior => {
      interior.polygon.remove()
      // interior.label.remove()
    })
    this.interiors = []
  }

  render() {
    this.getUserLocation()

    let offset = {}
    if(this.props.selectedLocation){
      if(window.innerWidth < 800){
        // offset={bottom: '155px'}
      } else {
        offset={left: '390px'}
      }
    }

    let mapStyle = { height: (window.isSafari && window.iOS ? window.innerHeight + 'px' : '100vh')}

    return (
      <div className="campus-map-container">
        <div ref={(node) => this._mapNode = node} id="map" style={ mapStyle} />
        {this.loadSpinner()}
        {this.addUserLocationButton()}
        <img className='logo' src='https://preview.ibb.co/dSeKTH/ucsb_map_logo.png' alt='logo' style={offset} />
      </div>
    )
  }
}


export default CampusMap
