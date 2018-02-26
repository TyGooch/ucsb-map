import React, { Component } from 'react'

import Autosuggest from 'react-autosuggest'
import levenshtein from 'fast-levenshtein'

// import theme from './searchTheme.js'
import './search.css'



class Search extends Component {
  getSuggestionValue(suggestion){
    return suggestion.name
  }

  renderSuggestion(suggestion) {
    return (
      <div className="suggestion-item">
        <img className="suggestion-icon" src="https://d30y9cdsu7xlg0.cloudfront.net/png/14173-200.png" alt="Magnifying Glass" />
        {suggestion.name}
      </div>
    )
  }

  getSuggestions(value) {
    let inputValue = value.trim().toLowerCase()
    let inputLength = inputValue.length

    let primarySuggestions = inputLength === 0 ? [] : this.props.locations.filter(location => {
      if(location.name.toLowerCase().replace('(','').replace(')','').split(' ')[0] === 'the')
        return location.name.toLowerCase().split(' ')[1].slice(0, inputLength) === inputValue

      return location.name.toLowerCase().slice(0, inputLength) === inputValue
    })

    let secondarySuggestions = inputLength === 0 ? [] : this.props.locations.filter(location =>
      location.name.toLowerCase().replace('(','').replace(')','').split(' ').slice(1).some(name => name.slice(0, inputLength) === inputValue)
    )

    if(secondarySuggestions.length > 1){
      secondarySuggestions = secondarySuggestions.sort((suggestion1, suggestion2) => {
        return levenshtein.get(suggestion1, inputValue) - levenshtein.get(suggestion2, inputValue)
      })
    }

    let noDuplicates = new Set(primarySuggestions.concat(secondarySuggestions))

    return Array.from(noDuplicates).slice(0,5)
  }

  constructor() {
    super()

    this.state = {
      value: '',
      suggestions: []
    }
  }

  componentWillReceiveProps(nextProps){

  }

  onChange = (event, { newValue, method }) => {
    if(this.props.selectedLocation && method === 'type')
      this.props.updateSelectedLocation(null)

    this.setState({
      value: newValue
    })
  }

  onBlur = (event, { highlightedSuggestion }) => {
    // if(this.props.selectedLocation)
    //   this.props.updateSelectedLocation(null)
    this.setState({
      value: ''
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  onSuggestionSelected = (event, { suggestion }) => {
    this.props.updateSelectedLocation(suggestion)
  }

  renderInputComponent = inputProps => (
    <div className="inputContainer">
      <img className="icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Ei-navicon.svg/1024px-Ei-navicon.svg.png" alt="Menu" />
      <input {...inputProps} />
    </div>
  );

  render() {
    const { value, suggestions } = this.state

    const inputProps = {
      placeholder: 'Search UCSB',
      value: this.props.selectedLocation && value !== this.props.selectedLocation.name ? this.props.selectedLocation.name : value,
      onChange: this.onChange,
      onBlur: this.onBlur
    }

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        renderInputComponent={this.renderInputComponent}
        inputProps={inputProps}
      />
    )
  }
}

export default Search
