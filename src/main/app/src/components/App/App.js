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
  
  closeSideBar(){
    if(this.props.sideBarOpened)
      return this.props.toggleSideBar()
  }

  render() {
    return(
      <div className='app-container'>
        <div className='search-container' onClick={this.closeSideBar.bind(this)}>
          <SearchContainer />
        </div>
        <SideBarContainer />
        <InfoPaneContainer onClick={this.closeSideBar.bind(this)}/>
        <CampusMapContainer onClick={this.closeSideBar.bind(this)}/>
      </div>
    )
  }
}

export default App
