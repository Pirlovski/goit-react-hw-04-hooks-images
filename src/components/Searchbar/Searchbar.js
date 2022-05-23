import React, { useState } from 'react';
import s from './Searchbar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';

export default function Searchbar({ onSubmit }) {
  const [images, setImages] = useState('');
  const [request, setRequest] = useState('');
  const handleNameChange = event => {
    setRequest(event.currentTarget.value.toLowerCase());
  };
  const handleSubmit = event => {
    event.preventDefault();
    if (request.trim() === '') {
      alert('Please enter a request');
      return;
    }

    onSubmit(request);
    setRequest('');
  };
  return (
    <header className="searchbar">
      <form className={s.Form} onSubmit={handleSubmit}>
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
          value={request}
          onChange={handleNameChange}
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
