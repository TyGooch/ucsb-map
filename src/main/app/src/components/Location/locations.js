import React, { Component } from 'react';
import Location from './location'
import ucsbBuildings from '../../util/ucsbBuildings.js'


class Locations extends Component {
  // constructor() {
  //   super()
  // 
  //   this.buildings = []
  // }

  // componentWillMount() {
  //   this.setUpBuildings()
  // }
  // 
  // addBuilding(building) {
  //   var parsedBuilding = {name:`${building.properties.name}`, corners:building.geometry.coordinates}
  //   this.buildings.push(parsedBuilding)
  // }
  // 
  // setUpBuildings() {
  //   ucsbBuildings.features.forEach(building => {
  //     let location = {};
  // 
  //     if(!building.properties.name)
  //       return
  // 
  //     if(["Lotte Lehmann Concert Hall", "Hatlen Theater", "Old Little Theatre"].includes(building.properties.name))
  //       return
  // 
  //     if( building.geometry.type === "polygon" && !building.properties.type){
  //       building.geometry.coordinates.forEach(coordinates => {
  //         coordinates.forEach((coord, idx, coordinates) => {
  //           coordinates[idx] = coord.reverse()
  //         })
  //       })
  // 
  //       // this.addBuilding(building)
  //     }
  //     else if( building.properties.type) {
  //       building.geometry.coordinates.forEach((subArray, idx, array) => {
  //         subArray.forEach((subArray, idx, array) => {
  //           if(Array.isArray(subArray[0])){
  //             subArray.forEach((subArray, idx, array) => {
  //               array[idx] = subArray.reverse()
  //             })
  //           }
  //           else{
  //             array[idx] = subArray.reverse()
  //           }
  //         })
  //       })
  // 
  //       // this.addBuilding(building)
  //     }
  //     // if(building.properties.name === 'UCSB Library')
  //     // console.log(building.geometry.coordinates);
  //     location.name = building.properties.name
  //     location.category = "building"
  //     location.geometry = JSON.stringify(building.geometry.coordinates)
  // 
  //     console.log(JSON.stringify(location))
  //     fetch('/api/locations', {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(location)
  // 
  //     })
  //   })
  // }



  render() {
    var locations = this.props.locations.map(location => {
        console.log(location);
      return(
        <div>
            <Location name={location.name} positions={location.geometry}/>
        </div>
      )
    })

    return (
      <div>
        {locations}
      </div>
    )
  }
}


export default Locations
