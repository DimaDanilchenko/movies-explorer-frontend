import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies() {
  return (
    <div className='saved-movies'>
      <SearchForm></SearchForm>
      <Preloader></Preloader>
      <MoviesCardList></MoviesCardList>
    </div>
  )
}
