import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import FilmLogo from '../../images/movie1.png';

import { useState } from 'react';

export default function MoviesCardList({ allMovies }) {
  console.log(allMovies);

  const moviesElements = allMovies.map((movies) => (
    <MoviesCard
      movies={movies}
    />
  ))
  return (
    <section className="cards">
      <div className="card-list">{moviesElements}</div>
      <button type="button" className="card-list__still">Ещё</button>
    </section>
  )
}
