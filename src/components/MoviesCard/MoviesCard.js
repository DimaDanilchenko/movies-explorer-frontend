import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

export default function MoviesCard({ name, imageSrc, duration, savedMovies, movieData, saveMovie, deleteMovie, movieId, isSaved }) {
  const location = useLocation();
  const isMainPage = location.pathname === '/movies';

  return (
    <div className='movie'>
      <a href={movieData.trailerLink} target='_blank' rel='noreferrer'>
        <img alt={name} className="movie__image" src={imageSrc} />
      </a>
      {
        isMainPage ? isSaved ? (
          <div className='movie__save movies-save__button'
            onClick={() => {
              savedMovies.forEach(el => {
                if (el.nameRU === movieData.nameRU) {
                  deleteMovie(el._id);
                }
              })
            }}>
          </div>
        ) :
          (
            <button type='button' className='movie__save movies-save__button_no' 
            onClick={() => {
              saveMovie(movieData);
            }}></button>
          ) :
          (
            <button type='button' className='movie__save movies-save__button_delete'
              onClick={() => {
                deleteMovie(movieId);
              }}></button>
          )
      }
      <div className="movie__data">
        <h2 className="movie__name">{name}</h2>
        <p className="movie__time">{duration}</p>
      </div>
    </div>
  )
}
