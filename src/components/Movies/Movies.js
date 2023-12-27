import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Movies() {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <div className='movies'>
      <SearchForm></SearchForm>
      <Preloader></Preloader>
      <MoviesCardList></MoviesCardList>
    </div>
  )
}
