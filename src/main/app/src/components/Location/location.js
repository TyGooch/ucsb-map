import React, { Component } from 'react';
import { Polygon, Popup } from 'react-leaflet'

class Location extends Component {
  render() {
    let polygon = null
    if (this.props.positions !== null) {
      polygon = (<Polygon id='location' color="grey" positions={this.props.positions}>
        <Popup>
          <span onClick={console.log('click')}>
             {this.props.name}
           </span>
        </Popup>
      </Polygon>)
    }
    return (
      <div>
        {polygon}
      </div>
    );
  }
}


export default Location
