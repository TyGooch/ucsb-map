import React, { Component } from 'react';
import Location from './location'
import ucsbBuildings from '../../util/ucsbBuildings.js'


class Locations extends Component {
  constructor() {
    super()

    this.buildings = []
  }

  componentWillMount() {
    this.setUpBuildings()
  }

  addBuilding(building) {
    var parsedBuilding = {name:`${building.properties.name}`, corners:building.geometry.coordinates}
    this.buildings.push(parsedBuilding)
  }

  // setUpBuildings() {
  //   ucsbBuildings.features.forEach(building => {
  //     let location = {};
  // 
  //     if(!building.properties.name)
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
    var buildings = this.buildings.map(building => {
      return(
        <div>
            <Location name={building.name} positions={building.corners}/>
        </div>
      )
    })

    return (
      <div>
        {buildings}
      </div>
    )
  }
}


export default Locations
