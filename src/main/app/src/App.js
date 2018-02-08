import React, { Component } from 'react';
import './App.css';
import CampusMap from './components/CampusMap/CampusMap'


class App extends Component {
  render() {
     return (
      <div className="App">
        <p>UCSB Map</p>
        <CampusMap />
      </div>
    );
  }
}

export default App;
