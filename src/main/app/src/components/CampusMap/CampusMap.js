import React, { Component } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-easybutton'
import config from './mapConfig.js'

import Spinner from 'react-spinkit'
import './campusMap.css'


class CampusMap extends Component {

  constructor(){
    super()

    this.state = {
      map: null
    }

    this._mapNode = null
    this.polygons = null
    this.userLocation = null
    this.mapControls = null

    this.handleMapClick = this.handleMapClick.bind(this)
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

    L.tileLayer(config.tileLayer.uri, config.tileLayer.options).addTo(map)

    this.setState({ map })
  }

  handlePolygonClick(location, polygon){
    this.props.updateSelectedLocation(location)
  }

  handleMapClick(e){
    if(e.originalEvent.target instanceof HTMLElement){
      this.props.updateSelectedLocation(null)
    }
  }

  addPolygons(){
    let polygons = []
    this.props.locations.forEach(location => {

      let polygon = L.polygon(location.polygons, {color: '#6DAAD0', fillColor: '#6DAAD0'})
      polygon.on('click', () => {this.handlePolygonClick(location, polygon)})
      polygon.addTo(this.state.map)
      polygons.push(polygon)

      if(this.props.selectedLocation && this.props.selectedLocation.name === location.name){
        polygon.setStyle({color: '#ebbd31'})
        var popup = L.popup()
          .setLatLng(polygon.getBounds().getCenter())
          .setContent(`<p>${location.name}</p>`)
        this.state.map.openPopup(popup)
      }
    })

    this.polygons = polygons
    this.getUserLocation()
  }

  removePolygons(){
    if(this.polygons)
      this.polygons.forEach(polygon => polygon.remove())
  }

  getUserLocation(){
    if(!this.state.map)
      return

    let map = this.state.map

    map.locate().on('locationfound', e => {
      if(this.userLocation){
        this.userLocation.markers.forEach(marker => marker.remove())
      }

      var uncertaintyCircle = L.circleMarker([e.latitude, e.longitude], {
          radius: e.accuracy/2,
          weight: 1,
          color: '#5384ec',
          opacity: 0.4,
          fillColor: '#5384ec',
          fillOpacity: 0.15
      })

      var outerUserLocationCircle = L.circleMarker([e.latitude, e.longitude], {
          radius: 7,
          weight: 2,
          color: 'white',
          fillColor: 'white',
          fillOpacity:1
      })

      // var pulsingRingIcon = L.divIcon({
      //   className: 'pulse-icon-ring',
      //   html: '<div class="pulsing-ring"></div>',
      //   iconSize: [e.accuracy ,e.accuracy]
      // })
      //
      // var pulsingRingIconDelayed = L.divIcon({
      //   className: 'pulse-icon-ring',
      //   html: '<div class="pulsing-ring delay"></div>',
      //   iconSize: [e.accuracy ,e.accuracy]
      // })

      var pulsingCircleIcon = L.divIcon({
        className: 'pulse-icon-circle',
        html: '<div class="pulsing-circle"></div>',
        // iconSize: [e.accuracy/4 ,e.accuracy/4]
        iconSize: [12, 12]
      })

      // var pulsingCircleInnerIcon = L.divIcon({
      //   className: 'pulse-icon-circle',
      //   html: '<div class="pulsing-circle"></div>',
      //   // iconSize: [e.accuracy/4 ,e.accuracy/4]
      //   iconSize: [15 ,15]
      // })
      //
      // var pulsingRing = L.marker([e.latitude, e.longitude], {icon: pulsingRingIcon})
      // var pulsingRingDelayed = L.marker([e.latitude, e.longitude], {icon: pulsingRingIconDelayed})
      var innerUserLocationCircle = L.marker([e.latitude, e.longitude], {icon: pulsingCircleIcon})

      map.addLayer(uncertaintyCircle)
      map.addLayer(outerUserLocationCircle)
      // map.addLayer(pulsingRing)
      // map.addLayer(pulsingRingDelayed)
      map.addLayer(innerUserLocationCircle)

      this.userLocation = {
        markers: [uncertaintyCircle, outerUserLocationCircle, innerUserLocationCircle],
        latlng: [e.latitude, e.longitude]
      }

      this.addUserLocationButton()
    })
  }

  panToUserLocation(){
    this.state.map.setView(this.userLocation.latlng)
  }

  addUserLocationButton(){
    if(this.state.map && this.userLocation && !this.mapControls){
      // let panToLocationButton = L.easyButton({
      //   states:[
      //     {
      //       stateName: 'panToUser',
      //       icon: 'fa-location-arrow',
      //       title: 'load image',
      //       onClick: this.panToUserLocation.bind(this)
      //     }
      //   ]
      // })
      let panToLocationButton = L.easyButton(
        '<img src="https://d30y9cdsu7xlg0.cloudfront.net/png/34744-200.png" class="location-button-image"/>',
        this.panToUserLocation.bind(this),
        'Your Location',
        'location-button'
      )

      panToLocationButton.addTo(this.state.map)
      this.mapControls = panToLocationButton
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

  render() {
    this.removePolygons()
    this.addPolygons()
    this.getUserLocation()
    // this.panToUserLocationButton()

    return (
      <div id="campusMapContainer">
        <div ref={(node) => this._mapNode = node} id="map" />
        {this.loadSpinner()}
      </div>
    )
  }
}


export default CampusMap
