import Search from 'react-search'
import ReactDOM from 'react-dom'
import React, { Component } from 'react'

class MySearch extends Component {

  HiItems(items) {
    console.log(items)
  }

  render () {
    let items = [
      { id: 0, value: 'ruby' },
      { id: 1, value: 'javascript' },
      { id: 2, value: 'lua' },
      { id: 3, value: 'go' },
      { id: 4, value: 'julia' }
    ]

    return (
      <div>

      SEARCH
      </div>
    )
  }
}

export default MySearch;
