import React, { Component } from 'react';
// import { Map, TileLayer, ZoomControl } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import config from './mapConfig.js'
import Locations from '../Location/locations'

class CampusMap extends Component {

  constructor(){
    super()

    this.state = {
      map: null,
      titleLayer: null,
      locations: null,
    }

    this._mapNode = null
  }

  componentDidMount(){
    if(!this.state.map)
      this.initializeMap(this._mapNode)
  }

  initializeMap(id) {
    if (this.state.map) return;
    // this function creates the Leaflet map object and is called after the Map component mounts
    let map = L.map(id, config.mapOptions);
    L.control.zoom({ position: "bottomright"}).addTo(map);

    // a TileLayer is used as the "basemap"
    const tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.options).addTo(map);

    // set our state to include the tile layer
    this.setState({ map, tileLayer });
  }

  addLocations(){
    console.log(this.props.locations.slice(0,2));
     this.props.locations.map(location => {
        // let polygons = location.polygons.map(polygon => {
        //   // console.log(polygon);
        //   return(
        //     <div>
        //       <Location name={location.name} positions={polygon}/>
        //     </div>
        //   )
        // })

        // console.log(polygons);
        console.log(location);
        if(location.name === "San Rafael Hall")
          console.log(location);
        L.polygon(location.polygons, {color: 'red'}).addTo(this.state.map)
        // console.log(location);
    })
  }

  render() {

    this.addLocations()

    return (
      <div id="campusMapContainer">
        <div ref={(node) => this._mapNode = node} id="map" />
      </div>
    )
  }
}


export default CampusMap
