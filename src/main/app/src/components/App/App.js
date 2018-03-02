import React from 'react'

import CampusMapContainer from '../CampusMap/CampusMapContainer'
import SearchContainer from '../Search/SearchContainer'
import InfoPaneContainer from '../InfoPane/InfoPaneContainer'
import SideBarContainer from '../SideBar/SideBarContainer'
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
        <SideBarContainer />
        <InfoPaneContainer />
        <CampusMapContainer />
      </div>
    )
  }
}

export default App
