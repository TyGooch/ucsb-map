import React, { Component } from 'react'

import Autosuggest from 'react-autosuggest'
import levenshtein from 'fast-levenshtein'

// import theme from './searchTheme.js'
import './search.css'



class Search extends Component {
  getSuggestionValue(suggestion) {
    return suggestion.name
  }
  
  getSuggestionShortName(suggestion) {
    if(!suggestion.shortName)
      return
    if(suggestion.category === 'Residence Hall' || suggestion.shortName === 'LIB' || suggestion.name.includes("Health") || suggestion.shortName.length > 5)
      return
    if(!suggestion.name.includes('(') && suggestion.name.toLowerCase().slice(0, 4).replace(' ','') !== suggestion.shortName.toLowerCase().slice(0,4).replace(' ', ''))
      return(` (${suggestion.shortName})`)
  }

  renderSuggestion(suggestion) {
    return (
      <div className="suggestion-item">
        <img className="suggestion-icon" src="https://d30y9cdsu7xlg0.cloudfront.net/png/14173-200.png" alt="Magnifying Glass" />
        {suggestion.name}
        {this.getSuggestionShortName(suggestion)}
      </div>
    )
  }

  getSuggestions(value) {
    let inputValue = value.trim().toLowerCase()
    let inputLength = inputValue.length
    
    let shortNameSuggestions = inputLength === 0 ? [] : this.props.locations.filter(location => {
      if(!location.shortName)
        return false
      return location.shortName.replace('-','').toLowerCase().slice(0, inputLength) === inputValue.replace(' ','')
    })
    
    shortNameSuggestions = shortNameSuggestions.sort( (a, b) => {
      a = a.shortName
      b = b.shortName
      
      if (a < b) 
        return -1
      else if (a > b) 
        return 1
      return 0
    })
    
    // shortNameSuggestions.forEach((suggestion, idx, arr) => {
    //   if(suggestion.category === 'Residence Hall' || suggestion.shortName === 'LIB' || suggestion.name.includes("Health") || suggestion.shortName.length > 5)
    //     return
    //   if(!suggestion.name.includes('(') && suggestion.name.toLowerCase().slice(0, 4).replace(' ','') !== suggestion.shortName.toLowerCase().slice(0,4).replace(' ', '')){
    //     arr[idx] = Object.assign({}, suggestion)
    //     arr[idx].name = arr[idx].name + ` (${arr[idx].shortName})`
    //   }
    // })
    
    console.log(shortNameSuggestions);
    
    let primarySuggestions = inputLength === 0 ? [] : this.props.locations.filter(location => {
      if(location.name.toLowerCase().replace('(','').replace(')','').split(' ')[0] === 'the')
        return location.name.toLowerCase().split(' ')[1].slice(0, inputLength) === inputValue

      return location.name.toLowerCase().slice(0, inputLength) === inputValue
    })
    
    // primarySuggestions = shortNameSuggestions.concat(primarySuggestions)

    let secondarySuggestions = inputLength === 0 ? [] : this.props.locations.filter(location =>
      location.name.toLowerCase().replace('(','').replace(')','').split(' ').slice(1).some(name => name.slice(0, inputLength) === inputValue)
    )

    if(secondarySuggestions.length > 1){
      secondarySuggestions = secondarySuggestions.sort((suggestion1, suggestion2) => {
        return levenshtein.get(suggestion1, inputValue) - levenshtein.get(suggestion2, inputValue)
      })
    }

    let noDuplicates = new Set(shortNameSuggestions.concat(primarySuggestions.concat(secondarySuggestions)))
    let suggestionsArray = Array.from(noDuplicates).slice(0,5)

    return suggestionsArray
    // return suggestionsArray.sort( (a, b) => {
    //   a = a.name.slice(inputLength, a.length)
    //   b = b.name.slice(inputLength, b.length)
    // 
    //   if (a < b) 
    //     return -1
    //   else if (a > b) 
    //     return 1
    //   return 0
    // })
  }

  constructor() {
    super()

    this.state = {
      value: '',
      suggestions: [],
      clickedClear: null,
      selectedSuggestion: null
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

    if(this.state.selectedSuggestion){
      this.refs.autosuggest.input.blur()
      this.setState({selectedSuggestion: false})
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
    this.setState({selectedSuggestion: true})
  }

  clearInput() {
    this.setState({value: '', clickedClear: true})
  }

  clearInputButton() {
    if(this.state.value !== ''){
      return(
        <div className="clear-input-button" onClick={this.clearInput.bind(this)}>
          <img className="clear-input-icon" src="https://www.materialui.co/materialIcons/navigation/close_grey_192x192.png" alt="clear-input"/>
        </div>
      )
    }
  }

  renderInputComponent = inputProps => (
    <div className="inputContainer">
      <div className="input-sidebar-button" onClick={this.props.toggleSideBar}>
        <img className="input-sidebar-button-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Ei-navicon.svg/1024px-Ei-navicon.svg.png" alt="Menu" />
      </div>
      <input {...inputProps} />
      {this.clearInputButton()}
    </div>
  )

  storeInputReference(autosuggest) {
    if (autosuggest !== null) {
      this.input = autosuggest.input
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
        renderSuggestion={this.renderSuggestion.bind(this)}
        renderInputComponent={this.renderInputComponent}
        inputProps={inputProps}
      />
    )
  }
}

export default Search
