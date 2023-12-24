import React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import './SearchForm.css';
import searchFormImage from '../../images/find-3.svg';

export default function SearchForm() {
  const [email, setEmail] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  return (
    <div className='search-form'>
      <div className="search-form__data">
        <input
          id="search-form-input"
          type="text"
          name="search"
          className="search-form__input"
          placeholder="Фильм"
          onChange={handleEmailChange}
          value={email}
          required=""
        />
        <img src={searchFormImage} alt="" className="search-form__image" />
      </div>
      <label className="toggle">
        <input className="toggle-checkbox" type="checkbox"/>
          <div className="toggle-switch"></div>
          <span className="toggle-label">Короткометражки</span>
      </label>
      <div className="search-form__line"></div>

    </div>
  )
}
