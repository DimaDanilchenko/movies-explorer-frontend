import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function MoviesCard({movies}) {
  const location = useLocation();
  const isMainPage = location.pathname === '/movies';
  const isSaved = useState(true);
  return (
    <div className='movie'>
        {
          isMainPage ? isSaved ? (
            <div className='movie__save movies-save__button'></div>
          ) :
            (
              <button type='button' className='movie__save movies-save__button_no' onClick={() => { }}></button>
            ) :
            (
              <button type='button' className='movie__save movies-save__button_delete'></button>
            )
        }
      <img alt={movies.image.name} className="movie__image" src={`https://api.nomoreparties.co/${movies.image.url}`} />
      <div className="movie__data">
        <h2 className="movie__name">{movies.nameRU}</h2>
        <p className="movie__time">{movies.duration}</p>
      </div>
    </div>
  )
}
