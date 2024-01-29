import { React, useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import mainApi from '../../utils/MainApi';
import api from '../../utils/MoviesApi';
import useEffectAfterMount from '../../hooks/useEffectAfterMount';

export default function Movies({saveMovie}) {
  const [allMovies, setAllMovies] = useState([]);

  const [allSituableMovies, setAllSituableMovies] = useState([]);
  const [settingObject, setSettingObject] = useState({
    movieName: '',
    isShort: false
  });
  const [savedMoviesIds, setSavedMoviesIds] = useState([]);
  const [isNoSearch, setIsNoSearch] = useState(true);

  useEffect(() => {
    api.getMovies()
      .then((res) => {
        setAllMovies(res);
      })
      .catch(console.error)
  }, [])



  function deleteMovie(){

  }

  const handleSearchMovies = function(name, isShort) {
    if (!name) {
      setSettingObject({
        ...settingObject,
        movieName: ''
      })
      
      return;
    }

    const lowerString = name.toLowerCase();
    const filteringString = `${lowerString[0].toUpperCase()}${lowerString.slice(1)}`

    setSettingObject({
      ...settingObject,
      movieName: filteringString,
      isShort
    })
  }

  const switchShorts = function(isShort) {
    setSettingObject({
      ...settingObject,
      isShort
    })
  }

  

  return (
    <main className='movies'>
      <SearchForm
        handleSearchMovies={handleSearchMovies}
        switchShorts={switchShorts}>
      </SearchForm>
      <MoviesCardList
        allMovies={allMovies}
        saveMovie={saveMovie}
        settingObject={settingObject}
        savedMoviesIds={savedMoviesIds}
        deleteMovie={deleteMovie}
      />
    </main>
  )
}
