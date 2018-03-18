// import ucsbBuildings from './ucsbBuildings.js'
// import allBuildings from './allBuildings.js'

const centerOfMass = require('@turf/center-of-mass');
const {getCoords} = require('@turf/invariant');
const turf = require('turf');
const jsonfile = require('jsonfile');
const fs = require('fs');


const interiorData = require('./locationData/interiors/interiors.json')

// function editGeojson() {
    interiorData.features.forEach(feature => {
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
        let centroid = centerOfMass(turf.multiPolygon(feature.geometry.coordinates))
        let coords = getCoords(centroid)
        feature.geometry.coordinates = coords.reverse()
        feature.geometry.type = "Point"
      })
    })

    console.log(interiorData);

    jsonfile.writeFile("./interiorsPoints.json", interiorData, function(err) {
        if (err) {
            console.log(err);
        }
    })

// }

// export {editGeojson}
