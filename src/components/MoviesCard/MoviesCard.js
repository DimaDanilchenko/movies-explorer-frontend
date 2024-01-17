import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function MoviesCard({ movie, isSaved }) {
  const location = useLocation();
  const isMainPage = location.pathname === '/movies';
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
      <img alt={movie.name} className="movie__image" src={movie.image.url} />
      <div className="movie__data">
        <h2 className="movie__name">{movie.name}</h2>
        <p className="movie__time">{movie.time}</p>
      </div>
    </div>
  )
}
