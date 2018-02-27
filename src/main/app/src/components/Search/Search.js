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
      suggestions: [],
      clickedClear: null
    }
  }

  componentWillReceiveProps(nextProps){
    if( nextProps.selectedLocation){
      this.setState({value: nextProps.selectedLocation.name})
    }
    else {
      this.setState({value: ''})
    }
  }

  componentDidUpdate(prevProps, nextProps) {
    if(this.state.clickedClear){
      this.props.updateSelectedLocation(null)
      this.refs.autosuggest.input.focus()
      this.setState({clickedClear: false})
    }
  }

  onChange = (event, { newValue, method }) => {
      this.setState({
        value: newValue,
        clickedClear: false
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

  clearInput() {
    this.setState({value: '', clickedClear: true})

    // if(this.props.selectedLocation)
    //   this.props.updateSelectedLocation(null)
  }

  clearInputButton() {
    if(this.state.value !== ''){
      return(
        <div className="clear-input-button" onClick={this.clearInput.bind(this)}>
          <img className="clear-input-icon" src="http://www.pvhc.net/img223/lvzjzwhxuoczayxvifvz.png" alt="clear-input"/>
        </div>
      )
    }
  }

  renderInputComponent = inputProps => (
    <div className="inputContainer">
      <img className="icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Ei-navicon.svg/1024px-Ei-navicon.svg.png" alt="Menu" />
      <input {...inputProps} />
      {this.clearInputButton()}
    </div>
  )

  storeInputReference(autosuggest) {
    if (autosuggest !== null) {
      this.input = autosuggest.input;
    }
  }

  render() {
    const { value, suggestions } = this.state

    const inputProps = {
      ref: this.storeInputReference,
      placeholder: 'Search UCSB',
      value,
      onChange: this.onChange,
      onBlur: this.onBlur
    }

    return (
      <Autosuggest
        ref={'autosuggest'}
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
