import React from 'react'

import CampusMapContainer from '../CampusMap/CampusMapContainer'
import SearchContainer from '../Search/SearchContainer'
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
        <CampusMapContainer />
        <img className='logo' src='https://vectr.com/tygooch/cwliL01Vy.svg?width=100&height=30.98&select=cwliL01Vypage0' alt='logo' />
      </div>
    )
  }
}

export default App
