import React, { Component } from 'react';
import { Polygon, Popup } from 'react-leaflet'

class Location extends React.Component {
  // getPositions() {
  //   if(this.props.type === "polygon"){
  //     return this.props.positions
  //   }
  // }
  render() {
    return (
      <div>
        <Polygon id='location' color="grey" positions={this.props.positions}>
          <Popup>
            <span onClick={console.log('click')}>
               {this.props.name}
             </span>
          </Popup>
        </Polygon>
      </div>
    );
  }
}


export default Location