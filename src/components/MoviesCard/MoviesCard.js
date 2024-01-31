import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

export default function MoviesCard({ movie, isSaved, onMovieSave }) {
  const location = useLocation();
  const isMainPage = location.pathname === '/movies';

  function handleLikeClick(){
    onMovieSave(movie);
  }

  return (
    <div className='movie'>
      {
        isMainPage ? isSaved ? (
          <div className='movie__save movies-save__button'></div>
        ) :
          (
            <button type='button' className='movie__save movies-save__button_no' onClick={handleLikeClick}></button>
          ) :
          (
            <button type='button' className='movie__save movies-save__button_delete'></button>
          )
      }
      <a href={movie.trailerLink} target="blank">
        <img alt={movie.name} className="movie__image" src={`https://api.nomoreparties.co${movie.image.url}`} />
      </a>
      <div className="movie__data">
        <h2 className="movie__name">{movie.nameRU}</h2>
        <p className="movie__time">{movie.duration}</p>
      </div>
    </div>
  )
}
