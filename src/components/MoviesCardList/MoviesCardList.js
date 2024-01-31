import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import FilmLogo from '../../images/movie1.png';

export default function MoviesCardList({ allMovies, onMovieSave }) {

  const cardElements = allMovies.map((movie) => (
    <MoviesCard
      movie={movie}
      onMovieSave={onMovieSave}
    />
  ))
  return (
    <section className="cards">
      <div className="card-list">{cardElements}</div>
      <button type="button" className="card-list__still">Ещё</button>
    </section>
  )
}
