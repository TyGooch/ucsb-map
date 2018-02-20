import React from 'react'

import CampusMapContainer from '../CampusMap/CampusMapContainer'
import './App.css'

class App extends React.Component {
  componentWillMount() {
    this.props.fetchLocations()
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