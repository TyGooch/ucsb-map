import React, { Component } from 'react';
import Location from './location'
import ucsbBuildings from '../../util/ucsbBuildings.js'


class Locations extends Component {
  render() {
    let locations = this.props.locations.map(location => {
        let polygons = location.polygons.map(polygon => {
          return(
            <div>
              <Location name={location.name} positions={polygon}/>
            </div>
          )
        })
        
        return polygons
    })

    return (
      <div>
        {locations}
      </div>
    )
  }
}


export default Locations
