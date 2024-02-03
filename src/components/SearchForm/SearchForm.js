import { React, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import searchFormImage from '../../images/find-3.svg';
import './SearchForm.css';

export default function SearchForm({ handleSearchMovies, switchShorts }) {
  const location = useLocation();
  const isMoviesPath = location.pathname === '/movies';
  const [movieName, setMovieName] = useState('');
  const [isShortMovie, setIsShortMovie] = useState(false);

  useEffect(() => {
    if (isMoviesPath) {
      if (localStorage.getItem('movieName')) {
        setMovieName(localStorage.getItem('movieName'));
      }
      if (localStorage.getItem('isMoviesShort')) {
        setIsShortMovie(true);
      }
    }
  }, [])

  function handleInput (e) {
    setMovieName(e.target.value);
  }

  function handleSwitchCheckbox () {
    setIsShortMovie(!isShortMovie);
    switchShorts(!isShortMovie);
    !isShortMovie ? localStorage.setItem('isMoviesShort', true) : localStorage.removeItem('isMoviesShort');
  }

  function handleSubmit (e) {
    e.preventDefault();
    if (isMoviesPath) {
      movieName ? localStorage.setItem('movieName', movieName) : localStorage.removeItem('movieName');
    }
    return handleSearchMovies(movieName, isShortMovie);
  }

  return (
    <form className='search-form' onSubmit={handleSubmit}>
      <div className="search-form__container">
        <div className="search-form__data">
          <input
            type="text"
            name="search"
            className="search-form__input"
            placeholder="Фильм"
            onChange={handleInput}
            value={movieName}
            required=""
          />
          <button src={searchFormImage} className="search-form__image" />
        </div>
        <div className='search-form__checkbox-field'>
          <label className='search-form__wrap'>
            <input
              type='checkbox'
              className='search-form__input-checkbox'
              onChange={handleSwitchCheckbox}
              checked={isShortMovie}
            />
            <span className='checkbox__mark'></span>
          </label>
          <p className='search-form__input-span'>Короткометражки</p>
        </div>
        <div className="search-form__line"></div>
      </div>
    </form>
  )
}
