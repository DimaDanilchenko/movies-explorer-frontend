import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

export default function MoviesCard({ name, imageSrc, duration, savedMovies, movieData, saveMovie, deleteMovie, isSaved }) {
  const location = useLocation();
  const isMainPage = location.pathname === '/movies';

  return (
    <div className='movie'>
      {
        isMainPage ? isSaved ? (
          <div className='movie__save movies-save__button'
            onClick={() => {
              savedMovies.forEach(el => {
                if (el.nameRU === movieData.nameRU) {
                  deleteMovie(el._id);
                }
              })
            }}
          ></div>
        ) :
          (
            <button type='button' className='movie__save movies-save__button_no' onClick={() => {
              saveMovie(movieData);
            }}></button>
          ) :
          (
            <button type='button' className='movie__save movies-save__button_delete'
              onClick={() => { deleteMovie(movieData)}}
            ></button>
          )
      }
      <a href={movieData.trailerLink} target="blank">
        <img className="movie__image" src={imageSrc} alt={`Постер фильма ${name}`} />
      </a>
      <div className="movie__data">
        <h2 className="movie__name">{name}</h2>
        <p className="movie__time">{duration}</p>
      </div>
    </div>
  )
}
