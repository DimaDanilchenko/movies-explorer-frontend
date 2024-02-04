import { React, useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import mainApi from '../../utils/MainApi';


export default function SavedMovies({
  onSearch,
  savedMovies,
  onSaveMovie,
  onDeleteMovie,
  disabledCheckboxSaved,
  onSubmitCheckbox,
  preloaderStatus }) {

  return (
    <>
      <section className="saved-movies">
        <SearchForm
          onSearch={onSearch}
          onSubmitCheckbox={onSubmitCheckbox}
          disabledSaved={disabledCheckboxSaved}
        />
        {preloaderStatus ? (
          <Preloader />
        ) : (
          <MoviesCardList
            foundMovies={savedMovies}
            onSaveMovie={onSaveMovie}
            savedMovies={savedMovies}
            onDeleteMovie={onDeleteMovie}
          />
        )}
      </section>
    </>
  );
}
