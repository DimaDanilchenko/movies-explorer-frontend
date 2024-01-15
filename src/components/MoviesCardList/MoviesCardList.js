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
      time: '1ч 17м',
      id: 1,
      saved: 'saved'
    },
    {
      image: {
        url: FilmLogo,
      },
      name: '33 слова о дизайне',
      time: '1ч 17м',
      id: 2,
      saved: 'saved'
    },
    {
      image: {
        url: FilmLogo,
      },
      name: '33 слова о дизайне',
      time: '1ч 17м',
      id: 3,
    },
    {
      image: {
        url: FilmLogo,
      },
      name: '33 слова о дизайне',
      time: '1ч 17м',
    },
    {
      image: {
        url: FilmLogo,
      },
      name: '33 слова о дизайне',
      time: '1ч 17м',
    },
    {
      image: {
        url: FilmLogo,
      },
      name: '33 слова о дизайне',
      time: '1ч 17м',
    },
    {
      image: {
        url: FilmLogo,
      },
      name: '33 слова о дизайне',
      time: '1ч 17м',
    },

  ]);

  const moviesElements = movies.map((movie) => (
    <MoviesCard
      movie={movie}
      key={movie.id}
      isSaved={movie.saved}
    />
  ))
  return (
    <section className="cards">
        <div className="card-list">{moviesElements}</div>
        <button type="button" className="card-list__still">Ещё</button>
    </section>
  )
}
