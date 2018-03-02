import React, { Component } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import config from './mapConfig.js'
import centerOfMass from '@turf/center-of-mass'
import {getCoords} from '@turf/invariant'
import turf from 'turf'

import Spinner from 'react-spinkit'
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
    this.labels = null
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

    map.on('zoomend', () => {
      this.removeLabels()
      this.addLabels()
    })

    L.tileLayer(config.tileLayer.uri, config.tileLayer.options).addTo(map)

    this.setState({ map })
  }

  handlePolygonClick(location, polygon){
    this.props.updateSelectedLocation(location)
  }

  handlePolygonMouseOver(e, location, polygon) {
    if(!(this.props.selectedLocation && location.name === this.props.selectedLocation.name)) {
      polygon.setStyle({color: '#ebbd31'})
    }
    
    polygon.closePopup()
    
    polygon.getPopup().setLatLng(e.latlng).openOn(this.state.map)
    
    // polygon.openPopup()
  }

  handlePolygonMouseOut(location, polygon) {
    if(!(this.props.selectedLocation && location.name === this.props.selectedLocation.name)) {
      polygon.setStyle({color: location.color})
    }
    
    polygon.closePopup()
  }

  handleMapClick(e){
    if(e.originalEvent.target instanceof HTMLElement){
      this.props.updateSelectedLocation(null)
    }
  }

  addPolygons(){
    let polygons = []
    let labels = []
    this.props.locations.forEach(location => {
      // let polygonColor = location.category === "parking" ? '#555555' : '#6DAAD0'
      // let polygonFillColor = location.category === "parking" ? 'gold' : '#6DAAD0'
      let polygon = L.polygon(location.polygons, {color: location.color, fillColor: location.color})
      polygon.on('click', () => {this.handlePolygonClick(location, polygon)})
      polygon.on('mouseover', (e) => {this.handlePolygonMouseOver(e, location, polygon)})
      polygon.on('mouseout', () => { this.handlePolygonMouseOut(location, polygon)})
      polygon.addTo(this.state.map)
      
      var popup = L.popup({closeButton: false})
      // .setLatLng(polygon.getBounds().getCenter())
      .setContent(`<p>${location.name}</p>`)
      // this.state.map.openPopup(popup)
      polygon.bindPopup(popup)
      // polygon.on('mouseover', function (e) {
      //       this.openPopup()
      //   })
      //   polygon.on('mouseout', function (e) {
      //       this.closePopup()
      //   })

      polygons.push(polygon)

      if(this.props.selectedLocation && this.props.selectedLocation.name === location.name){
        polygon.setStyle({color: '#ebbd31'})
      }
    })

    this.polygons = polygons
    this.labels = labels
    this.getUserLocation()
  }

  removePolygons(){
    if(this.polygons)
      this.polygons.forEach(polygon => polygon.remove())
  }

  addLabels(){
    if(!this.polygons)
      return

    let labels = []
    this.props.locations.forEach(location => {
      if(location.name === 'Engineering 2' || location.name.split(' ')[0] === 'Building')
        return
      if(turf.area(turf.multiPolygon(location.polygons)) < 300 && this.state.map.getZoom() < 19)
        return

      // console.log(location.name)
      // console.log(turf.area(turf.multiPolygon(location.polygons)))

      var fontSize = this.state.map.getZoom() <= 17 ? Math.pow(2, (this.state.map.getZoom() - 14)) : 15
      if(fontSize <= 4)
        fontSize = 0
      if(location.name.length <= 5)
        fontSize *= 2

      // console.log(fontSize)

      var divIcon = L.divIcon({
        className: 'label-container',
        html: `<div class="label"><div class="label-text ${location.name}" style="font-size:${fontSize}px !important;">${location.name}</div></div>`,
      })
        let centroid = centerOfMass(turf.multiPolygon(location.polygons))
        let coords = getCoords(centroid)
        var label = L.marker({lat: coords[0], lng: coords[1]}, {icon: divIcon, interactive: false})

        label.addTo(this.state.map)
        labels.push(label)
    })
    this.labels = labels
  }

  removeLabels(){
    if(this.labels)
      this.labels.forEach(label => label.remove())
  }

  getUserLocation(){
    if(!this.state.map)
      return

    let map = this.state.map

    map.locate().on('locationfound', e => {
      if(this.userLocation){
        this.userLocation.markers.forEach(marker => marker.remove())
      }

      var uncertaintyCircle = L.circle([e.latitude, e.longitude], {
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

      var pulsingCircleIcon = L.divIcon({
        className: 'pulse-icon-circle',
        html: '<div class="pulsing-circle"></div>',
        iconSize: [12, 12]
      })

      var innerUserLocationCircle = L.marker([e.latitude, e.longitude], {icon: pulsingCircleIcon})

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
      return (
        <div className="location-button-container" onClick={this.panToUserLocation.bind(this)}>
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

  render() {
    this.removePolygons()
    this.removeLabels()
    this.addPolygons()
    this.addLabels()
    this.getUserLocation()

    return (
      <div id="campusMapContainer">
        <div ref={(node) => this._mapNode = node} id="map" />
        {this.loadSpinner()}
        {this.addUserLocationButton()}
      </div>
    )
  }
}


export default CampusMap
