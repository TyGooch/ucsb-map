import React, { Component } from 'react'

import Autosuggest from 'react-autosuggest'
import levenshtein from 'fast-levenshtein'

const getSuggestionValue = suggestion => suggestion.name

const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
)


class Search extends Component {
  getSuggestions(value) {
    let inputValue = value.trim().toLowerCase()
    let inputLength = inputValue.length

    let primarySuggestions = inputLength === 0 ? [] : this.props.locations.filter(location => {
      if(location.name.toLowerCase().split(' ')[0] === 'the')
        return location.name.toLowerCase().split(' ')[1].slice(0, inputLength) === inputValue

      return location.name.toLowerCase().slice(0, inputLength) === inputValue
    })

    let secondarySuggestions = inputLength === 0 ? [] : this.props.locations.filter(location =>
      location.name.toLowerCase().split(' ').slice(1).some(name => name.slice(0, inputLength) === inputValue)
    )

    if(secondarySuggestions.length > 1){
      secondarySuggestions = secondarySuggestions.sort((suggestion1, suggestion2) => {
        levenshtein.get(suggestion1, inputValue) - levenshtein.get(suggestion2, inputValue)
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

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
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

  render() {
    const { value, suggestions } = this.state

    const inputProps = {
      placeholder: 'Type a building name',
      value,
      onChange: this.onChange
    }

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    )
  }
}

export default Search
