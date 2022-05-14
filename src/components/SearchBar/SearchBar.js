import React, { Component } from 'react'
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';

class SearchBar extends Component {
  state = {
    value: ''
  }

  timeout = null ;

  doSearch = (event) => {
    this.setState({ value: event.target.value })
    clearTimeout(this.timeout);
    // Set timeout to wait for user to stop input
    this.timeout = setTimeout( () => {
      this.props.callback(this.state.value);
    }, 500);
  }

  render() {
    const { value } = this.state;
    return (
      <div className="searchbar-wrapper">
        <div className="searchbar">
        <div className="search-icon">
        <FontAwesomeIcon icon={ faSearch } />
        </div>
          <input
            type="text"
            className="searchbar-input"
            placeholder="Search"
            onChange={this.doSearch}
            value={value}
            />
        </div>
      </div>
    )
  }
}

SearchBar.propTypes = {
  callback: PropTypes.func
}


export default SearchBar;
