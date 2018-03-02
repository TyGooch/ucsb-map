import React from 'react'

import CampusMapContainer from '../CampusMap/CampusMapContainer'
import SearchContainer from '../Search/SearchContainer'
import MenuContainer from '../Menu/MenuContainer'
import './App.css'

// import {populateDb} from '../../util/populateDb'

class App extends React.Component {
  componentWillMount() {
    this.props.fetchLocations()
    // populateDb()
  }

  render() {
    return(
      <div className='app-container'>
        <div className='search-container'>
          <SearchContainer />
        </div>
        <MenuContainer />
        <div className='map-container'>
          <CampusMapContainer />
          <img className='logo' src='https://preview.ibb.co/dSeKTH/ucsb_map_logo.png' alt='logo' />
        </div>
      </div>
    )
  }
}

export default App
