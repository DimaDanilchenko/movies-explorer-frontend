import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from '../Header/Header';

export default function Movies({ loggedIn }) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <div className='movies'>
      <Header loggedIn={loggedIn}/>
      <SearchForm></SearchForm>
      <Preloader></Preloader>
      <MoviesCardList></MoviesCardList>
    </div>
  )
}
