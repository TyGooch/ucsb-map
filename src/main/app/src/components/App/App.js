import React from 'react'

import CampusMapContainer from '../CampusMap/CampusMapContainer'
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
        <CampusMapContainer />
      </div>
    )
  }
}

export default App