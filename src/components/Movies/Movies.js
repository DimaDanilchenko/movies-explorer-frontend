import { React, useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import useEffectAfterMount from '../../hooks/useEffectAfterMount';

export default function Movies({ allMovies, savedMovies, saveMovie, deleteMovie, savedMoviesIds }) {
  const [allSituableMovies, setAllSituableMovies] = useState([]);
  const [settingObject, setSettingObject] = useState({
    movieName: '',
    isShort: false
  });
  const [isNoSearch, setIsNoSearch] = useState(true);

  function handleSearchMovies(name, isShort) {
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

  function switchShorts(isShort) {
    setSettingObject({
      ...settingObject,
      isShort
    })
  }

  useEffectAfterMount(() => {
    if (localStorage.getItem('movieName') && isNoSearch) {
      let movieName = localStorage.getItem('movieName').toLowerCase();
      movieName = `${movieName[0].toUpperCase()}${movieName.slice(1,)}`
      setSettingObject({
        ...settingObject,
        movieName
      })
      setIsNoSearch(false);
    }
    if (!settingObject.movieName) {
      setAllSituableMovies([]);
      return;
    }
    const ruRegExp = /[а-яё]/i;
    const catchedMovies = allMovies.filter(el => {
      return settingObject.movieName.match(ruRegExp) ?
        // el.nameRU.startsWith(settingObject.movieName) :
        // el.nameEN.startsWith(settingObject.movieName);
        el.nameRU.includes(settingObject.movieName) :
        el.nameEN.includes(settingObject.movieName)
    });

    if (settingObject.isShort) {
      const shortCatchedMovies = catchedMovies.filter(el => {
        return el.duration <= 40;
      });
      setAllSituableMovies(shortCatchedMovies);
      return;
    }
    setAllSituableMovies(catchedMovies);
  }, [settingObject])

  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(localStorage.getItem('movies'));
      setAllSituableMovies(movies);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(allSituableMovies));
  }, [allSituableMovies])


  return (
    <main className='movies'>
      <SearchForm
        handleSearchMovies={handleSearchMovies}
        switchShorts={switchShorts}
      ></SearchForm>
      <Preloader></Preloader>
      <MoviesCardList
        allMovies={allSituableMovies}
        savedMovies={savedMovies}
        settingObject={settingObject}
        saveMovie={saveMovie}
        savedMoviesIds={savedMoviesIds}
        deleteMovie={deleteMovie}
      ></MoviesCardList>
    </main>
  )
}
