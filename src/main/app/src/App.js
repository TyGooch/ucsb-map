import React, { Component } from 'react';
import './App.css';
import './react-search.css';
import CampusMap from './components/CampusMap/CampusMap'
import MySearch from './components/Search/MySearch'

class App extends Component {
  render() {
     return (
      <div className="App">
        <MySearch />
        <CampusMap />
      </div>
    );
  }
}

export default App;
