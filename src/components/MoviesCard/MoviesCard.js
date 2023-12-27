import React from 'react';
import './MoviesCard.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function MoviesCard({ movie }) {
  return (
    <div className='movie'>
      <button type="button" className='movie__save' />
      <img alt={movie.name} className="movie__image" src={movie.image} />
      <div className="movie__data">
        <h2 className="movie__name">{movie.name}</h2>
        <p className="movie__time">{movie.time}</p>
      </div>
    </div>
  )
}
