// import ucsbBuildings from './ucsbBuildings.js'
// import allBuildings from './allBuildings.js'

import apartments from './locationData/apartments/apartments.js'
import campus from './locationData/campus/campus.js'
import dining from './locationData/dining/dining.js'
import dorms from './locationData/dorms/dorms.js'
import parking from './locationData/parking/parking.js'


function populateDb() {

  var locationData = {"apartments": apartments, "campus": campus, "dining": dining, "dorms": dorms, "parking": parking}
  let locationObjs = {}

  Object.keys(locationData).forEach(locations => {
    locationData[locations].features.forEach(building => {
      // if(!building.properties.name)
      //   return

      if(["Lotte Lehmann Concert Hall", "Hatlen Theater", "Old Little Theatre"].includes(building.properties.name))
      return

      if( building.geometry.type.toLowerCase() === "polygon" && !building.properties.type){
        building.geometry.coordinates.forEach(coordinates => {
          coordinates.forEach((coord, idx, coordinates) => {
            coordinates[idx] = coord.reverse()
          })
        })
      }
      else if( building.properties.type) {
        building.geometry.coordinates.forEach((subArray, idx, array) => {
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
      }


      if(!Object.keys(locationObjs).includes(building.properties.name)){
        let location = {}
        let name
        if(!building.properties.name) {
          if(!building.properties.ref)
            return
          name = `Building ${building.properties.ref}`
        } else if(building.properties.name.includes('Parking') && building.properties.name !== 'Parking Services') {
          name = `Lot ${building.properties.name.split(' ')[0]}`
          if(building.properties.name.includes('Mesa'))
            name = `Lot ${building.properties.name.split(' ')[1]} (Mesa Lot)`
        } else {
          name = building.properties.name
        }
        
        
        location.name = name
        location.category = building.properties.category
        location.polygons = [building.geometry.coordinates]
        location.color = locations === "parking" ? building.properties.lotColor : '#6DAAD0'
        location.website = building.properties.website
        location.image = building.properties.image
        location.details = building.properties.details
        location.shortName = building.properties.shortName

        locationObjs[location.name] = location
      } else {
        locationObjs[building.properties.name].polygons.push(building.geometry.coordinates)
      }

    })
  })
  Object.keys(locationObjs).forEach(obj => {
    locationObjs[obj].polygons = JSON.stringify(locationObjs[obj].polygons)
    console.log(JSON.stringify(locationObjs[obj]))
    fetch('http://localhost:8080/api/locations', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(locationObjs[obj])
    })
  })

}

export {populateDb}
