import { React, useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import mainApi from '../../utils/MainApi';

export default function SavedMovies() {
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedSituableMovies, setSavedSituableMovies] = useState([]);

  const [settingObject, setSettingObject] = useState({
    movieName: '',
    isShort: false
  });

  const deleteMovie = function (id) {
    mainApi.deleteSavedMovie(id)
      .then(res => {
        const newSavedMovies = savedMovies.filter(el => {
          return el.movieId !== res.movieId;
        })
        setSavedMovies(newSavedMovies);
      })
      .catch(err => console.log(err))
  }

  const handleSearchMovies = function (name, isShort) {
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

  useEffect(() => {
    if (!settingObject.movieName) {
      setSavedSituableMovies([]);

      return;
    }

    const ruRegExp = /[а-яё]/i;

    const situableMovies = savedMovies.filter(el => {
      return settingObject.movieName.match(ruRegExp) ? el.nameRU.startsWith(settingObject.movieName) : el.nameEN.startsWith(settingObject.movieName);
    });

    if (settingObject.isShort) {
      const shortSituableMovies = situableMovies.filter(el => {
        return el.duration <= 40;
      });

      setSavedSituableMovies(shortSituableMovies);

      return;
    }

    setSavedSituableMovies(situableMovies);
  }, [settingObject, savedMovies])

  const switchShorts = function (isShort) {
    setSettingObject({
      ...settingObject,
      isShort
    })
  }

  useEffect(() => {
    mainApi.getSavedMovies()
      .then(res => {
        setSavedMovies(res);
      })
      .catch(err => {
        console.log('Ошибка получения сохранённых фильмов', err);
      })
  }, []);

  return (
    <main className='saved-movies'>
      <SearchForm handleSearchMovies={handleSearchMovies} switchShorts={switchShorts}></SearchForm>
      <Preloader></Preloader>
      <MoviesCardList
        movies={settingObject.movieName ? savedSituableMovies : savedMovies}
        deleteMovie={deleteMovie}
        settingObject={settingObject}
      />
    </main>
  )
}
