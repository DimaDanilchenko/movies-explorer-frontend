import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

export default function Movies({  
  onSearch,
  foundMovies,
  savedMovies,
  onSaveMovie,
  onDeleteMovie,
  disabledCheckbox,
  onSubmitCheckbox,
  preloaderStatus }) {
  
  return (
    <main className='movies'>
      <SearchForm
        onSearch={onSearch}
        onSubmitCheckbox={onSubmitCheckbox}
        disabled={disabledCheckbox}
      ></SearchForm>
      {preloaderStatus ? (
        <Preloader />
      ) : (
        <MoviesCardList
        foundMovies={foundMovies}
        onSaveMovie={onSaveMovie}
        savedMovies={savedMovies}
        onDeleteMovie={onDeleteMovie}
        ></MoviesCardList>
      )}
    </main>
  )
}
