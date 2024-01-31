import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from '../Header/Header';

export default function Movies({ allMovies }) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className='movies'>
      <SearchForm></SearchForm>
      <Preloader></Preloader>
      <MoviesCardList
        allMovies={allMovies}
      ></MoviesCardList>
    </main>
  )
}
