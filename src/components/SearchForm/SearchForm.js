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
    <form className='search-form'>
      <div className="search-form__container">
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
        <div className='search-form__checkbox-field'>
          <label className='search-form__wrap'>
            <input
              type='checkbox'
              className='search-form__input-checkbox'
            />
            <span className='checkbox__mark'></span>
            <p className='search-form__input-span'>Короткометражки</p>
          </label>
        </div>
        <div className="search-form__line"></div>
      </div>
    </form>
  )
}
