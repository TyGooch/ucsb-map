import React, { Component } from 'react';
import Location from './location'

class Locations extends Component {
  render() {
    let locations = this.props.locations.map(location => {
        let polygons = location.polygons.map(polygon => {
          // console.log(polygon);
          return(
            <div>
              <Location name={location.name} positions={polygon}/>
            </div>
          )
        })

        // console.log(polygons);
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
