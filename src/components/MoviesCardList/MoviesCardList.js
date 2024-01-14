import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import FilmLogo from '../../images/movie1.png';

import { useState } from 'react';

export default function MoviesCardList(props) {
  const [movies, setMovies] = useState([
    {
      image: {
        url: FilmLogo,
      },
      name: '33 слова о дизайне',
      time: '1ч 17мин',
      id: 1,
    },
    {
      image: {
        url: FilmLogo,
      },
      name: '33 слова о дизайне',
      time: '1ч 17мин',
      id: 2,
    },
    {
      image: {
        url: FilmLogo,      
      },
      name: '33 слова о дизайне',
      time: '1ч 17мин',
      id: 3,
    },
    {
      image: {
        url: FilmLogo,      
      },
      name: '33 слова о дизайне',
      time: '1ч 17мин',
    },
    {
      image: {
        url: FilmLogo,      
      },
      name: '33 слова о дизайне',
      time: '1ч 17мин',
    },
    {
      image: {
        url: FilmLogo,      
      },
      name: '33 слова о дизайне',
      time: '1ч 17мин',
    },
    {
      image: {
        url: FilmLogo,      
      },
      name: '33 слова о дизайне',
      time: '1ч 17мин',
    },

  ]);

  const moviesElements = movies.map((movie) => (
    <MoviesCard
      movie={movie}
      key={movie.id}
    />
  ))
  return (
    <section className="cards">
      <div className="card-list">{moviesElements}</div>
      <button className="card-list__still">Ещё</button>
    </section>
  )
}
