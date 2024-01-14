import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';

export default function SavedMovies({loggedIn}) {
  return (
    <div className='saved-movies'>
      <Header loggedIn={loggedIn}/>
      <SearchForm></SearchForm>
      <Preloader></Preloader>
      <MoviesCardList></MoviesCardList>
    </div>
  )
}
