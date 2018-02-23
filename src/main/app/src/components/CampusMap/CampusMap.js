import React, { Component } from 'react';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import config from './mapConfig.js'
import Locations from '../Location/locations'

class CampusMap extends Component {

  constructor(){
    super()

    this.state = {
      map: null
    }

    this._mapNode = null
    this.polygons = null
    // this.selectedLocation = null

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
    // L.control.zoom({ position: "bottomright"}).addTo(map);

    let tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.options).addTo(map);

    this.setState({ map });
  }

  handlePolygonClick(location, polygon){
    var popup = L.popup()
      .setLatLng(polygon.getBounds().getCenter())
      .setContent(`<p>${location.name}</p>`)

    this.state.map.openPopup(popup);

    // polygon.setStyle({color: '#dddddd'})

    // this.selectedLocation = polygon
    this.props.updateSelectedLocation(location)
  }

  handleMapClick(e){
    //check if click was outside of polygon
    if(e.originalEvent.path[0] instanceof HTMLElement){
      this.props.updateSelectedLocation(null)
    }
      // this.selectedLocation = null

    // this.locations.forEach((polygon) => {
    //   if(polygon !== this.props.selectedLocation)
    //     polygon.setStyle({color: 'red'})
    // })
  }

  addPolygons(){
    let polygons = []
     this.props.locations.map(location => {
        let polygon = L.polygon(location.polygons, {color: this.props.selectedLocation && this.props.selectedLocation.name === location.name ? 'red' : 'blue'})
        polygon.on('click', () => {this.handlePolygonClick(location, polygon)})
        polygon.addTo(this.state.map)
        polygons.push(polygon)
    })

    this.polygons = polygons
  }

  removePolygons(){
    if(this.polygons)
      this.polygons.forEach(polygon => polygon.remove())
  }

  render() {
    // if(this.props.locations.length > 0)
    this.removePolygons()
    this.addPolygons()

    return (
      <div id="campusMapContainer">
        <div ref={(node) => this._mapNode = node} id="map" />
      </div>
    )
  }

}


export default CampusMap
