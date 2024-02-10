import React from 'react';
import { Route, useLocation } from "react-router-dom";
import { handleChangeDuration } from "../../utils/constants";
import saveIcon from "../../images/save3d.svg";
import savedIcon from "../../images/checkbox-saved.svg";
import deleteIcon from "../../images/delete-icon.svg";
import './MoviesCard.css';

export default function MoviesCard({ movie, onSaveMovie, onDeleteMovie, savedMovies }) {
  const savedMovie = savedMovies.find((m) => m.movieId === movie.id);
  const { pathname } = useLocation();

  function submitMovie() {
    if (!savedMovie) {
      onSaveMovie(movie);
    } else {
      onDeleteMovie(savedMovie);
    }
  }

  function handleDeleteMovie() {
    onDeleteMovie(movie);
  }

  return (
    <li className="movie">
      {pathname === '/movies' ?
        <a href={movie.trailerLink} target="blank" >
          <img
            className="movie__image"
            src={`https://api.nomoreparties.co${movie.image.url}`}
            alt="изображение фильма"
          />
        </a>
        :
        <a href={movie.trailerLink} target="blank" className='movie__trailer'>
          <img
            className="movie__image"
            src={movie.image}
            alt="изображение фильма"
          />
        </a>}
      {pathname === '/movies' ?
        <img
          alt=""
          className={!savedMovie ? 'movie__save' : 'movie__save movies-save__button'}
          onClick={submitMovie}
        // src={!savedMovie ? saveIcon : savedIcon}
        />
        :
        <img
          alt="Удалить фильм"
          className="movie__save movies-save__button_delete"
          src={deleteIcon}
          onClick={handleDeleteMovie}
        />}
      <div className="movie__data">
        <h2 className="movie__name">{movie.nameRU}</h2>
        <p className="movie__time">
          {handleChangeDuration(movie.duration, movie)}
        </p>
      </div>

    </li>
  );
}
