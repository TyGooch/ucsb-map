// import ucsbBuildings from './ucsbBuildings.js'
// import allBuildings from './allBuildings.js'

import mapValues from 'async/mapValues';

import interiorData from './locationData/interiors/interiors.json'

function populateInteriors() {

    let interiorObjs = {}

    interiorData.features.forEach(feature => {
      if(feature.properties.id === "" || feature.properties.bld === "")
        return
        feature.geometry.coordinates.forEach((subArray, idx, array) => {
          subArray.forEach((subArray, idx, array) => {
            if(Array.isArray(subArray[0])){
              subArray.forEach((subArray, idx, array) => {
                array[idx] = subArray.reverse()
              })
            }
            else{
              array[idx] = subArray.reverse()
            }
          })
        })

      if(feature.properties.id && feature.properties.bld){
        let interior = {}
        let name = feature.properties.bld + ' ' + feature.properties.id

        interior.name = name
        interior.building = feature.properties.bld
        interior.polygons = [feature.geometry.coordinates]
        interior.level = feature.properties.level

        interiorObjs[interior.name] = interior
      }
    })

    // console.log(interiorObjs[Object.keys(interiorObjs)]);
    //
    // const datapost = interiorObjs[Object.keys(interiorObjs)]
    // fetch('http://localhost:8080/api/interiors', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(datapost)
    // })
    // })

    console.log(Object.keys(interiorObjs).length);

  // Object.keys(interiorObjs).forEach(obj => {
  //     // console.log(JSON.stringify(interiorObjs[obj]));
  //     interiorObjs[obj].polygons = JSON.stringify(interiorObjs[obj].polygons)
  //     // console.log(JSON.stringify(interiorObjs[obj]))
  //
  //     setTimeout(() => {
  //       fetch('http://localhost:8080/api/interiors', {
  //         method: 'POST',
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(interiorObjs[obj])
  //       })
  //     }, 200)
  // })

}

export {populateInteriors}
