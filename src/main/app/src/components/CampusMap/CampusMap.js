import React, { Component } from 'react';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import config from './mapConfig.js'



class CampusMap extends Component {

  constructor(){
    super()

    this.state = {
      map: null
    }

    this._mapNode = null
    this.polygons = null
    this.userLocation = null

    this.handleMapClick = this.handleMapClick.bind(this)
  }

  componentDidMount(){
    if(!this.state.map)
      this.initializeMap(this._mapNode)
  }

  initializeMap(id) {
    if (this.state.map) return;

    let map = L.map(id, config.mapOptions);
    map.on('click', this.handleMapClick)

    L.tileLayer(config.tileLayer.uri, config.tileLayer.options).addTo(map);

    this.setState({ map });
  }

  handlePolygonClick(location, polygon){
    this.props.updateSelectedLocation(location)
  }

  handleMapClick(e){
    console.log(e.layer);
    if(e.originalEvent.path[0] instanceof HTMLElement){
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

      polygon.bringToFront()
    })

    this.polygons = polygons
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
        this.userLocation.innerCircle.remove()
        this.userLocation.outerCircle.remove()
      }

      var outerCircle = L.circle([e.latitude, e.longitude], e.accuracy/2, {
          weight: 1,
          color: 'white',
          fillColor: 'blue',
          fillOpacity: 0.1
      });
      map.addLayer(outerCircle);

      var innerCircle = L.circle([e.latitude, e.longitude], 5, {
          weight: 1,
          color: 'white',
          fillColor: 'blue',
          fillOpacity: 1
      });
      map.addLayer(innerCircle);

      this.userLocation = {innerCircle: innerCircle, outerCircle: outerCircle}
    })
  }

  render() {
    this.removePolygons()
    this.addPolygons()
    this.getUserLocation()

    return (
      <div id="campusMapContainer">
        <div ref={(node) => this._mapNode = node} id="map" />
      </div>
    )
  }
}


export default CampusMap
