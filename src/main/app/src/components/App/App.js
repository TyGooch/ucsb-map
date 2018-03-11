import React from 'react'

import CampusMapContainer from '../CampusMap/CampusMapContainer'
import SearchContainer from '../Search/SearchContainer'
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
        <div className='search-container'>
          <SearchContainer />
        </div>
        <CampusMapContainer />        
        <div className="sidebar-overlay" style={{display: this.props.sideBarOpened ? 'block' : 'none'}} onClick={this.closeSideBar.bind(this)}>
        </div>
        <SideBarContainer />
      </div>
    )
  }
}

export default App
