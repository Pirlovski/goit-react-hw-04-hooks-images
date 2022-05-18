import React, { Component } from 'react';
import s from './Searchbar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
class Searchbar extends Component {
  state = {
    images: '',
    request: '',
  };
  handleNameChange = event => {
    this.setState({ request: event.currentTarget.value.toLowerCase() });
  };
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.request.trim() === '') {
      alert('Please enter a request');
      return;
    }
    this.props.onSubmit(this.state.request);
    this.setState({ request: '' });
  };
  render() {
    return (
      <header className="searchbar">
        <form className={s.Form} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.Form__Button}>
            <span className="button-label">
              {' '}
              <AiOutlineSearch
                size="2em"
                fill="#ccc"
                className={s.Button__icon}
              />
            </span>
          </button>

          <input
            className={s.Form__Input}
            type="text"
            value={this.state.request}
            onChange={this.handleNameChange}
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
