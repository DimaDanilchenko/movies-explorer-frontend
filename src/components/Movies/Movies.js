import { React, useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import api from '../../utils/MoviesApi';

export default function Movies(props) {
  const [allMovies, setAllMovies] = useState([]);
  const [allSituableMovies, setAllSituableMovies] = useState([]);

  useEffect(() => {
    api.getMovies()
    .then(data => {
      setAllMovies(state => [...state, ...data]);
    })
  }, []);

  console.log(allMovies);

  return (
    <main className='movies'>
      <SearchForm></SearchForm>
      <Preloader></Preloader>
      <MoviesCardList
        allMovies={allMovies}
      />
    </main>
  )
}
