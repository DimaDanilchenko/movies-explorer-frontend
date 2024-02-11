import { React, useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useRef } from 'react';
import {
  TIMEOUT,
  WIDTH_1025PX,
  WIDTH_1260PX,
  WIDTH_880PX,
  WIDTH_831PX,
  WIDTH_768PX,
  WIDTH_531PX,
  WIDTH_450PX
} from "../../utils/constants";

export default function MoviesCardList({
  foundMovies,
  onSaveMovie,
  savedMovies,
  onDeleteMovie }) {
  const { pathname } = useLocation();
  const [maxEl, setMaxEl] = useState(12);
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [width, setWidth] = useState();
  const location = useLocation();

  //начальное кол-во фильмов
  function setDefaultMovies(count) {
    setMaxEl(count);
    let movies = [];
    foundMovies.forEach((item, i) => {
      if (i < count) {
        movies.push(item);
      }
    });
    setRenderedMovies(movies);
  }

  useEffect(() => {
    const display = window.innerWidth;
    if (display < WIDTH_450PX) {
      setDefaultMovies(5);
    } else if(display < WIDTH_531PX){
      setDefaultMovies(8);
    } else if(display < WIDTH_768PX){
      setDefaultMovies(5);
    } else if(display < WIDTH_831PX){
      setDefaultMovies(8);
    } else if(display < WIDTH_880PX){
      setDefaultMovies(5);
    } else if(display < WIDTH_1260PX){
      setDefaultMovies(8);
    }
     else {
      setDefaultMovies(12);
    }
    if (location.pathname === "/saved-movies") {
      setMaxEl(savedMovies.length);
    }
  }, [foundMovies, width, location]);

  useEffect(() => {
    setMovies();
  }, [maxEl]);

  //отслеживает разрешение экрана
  useEffect(() => {
    onSubscribe();
    return () => offSubscribe;
  }, []);

  function handleSubscribe() {
    setWidth(window.innerWidth);
  }

  function onSubscribe() {
    window.addEventListener("resize", function () {
      setTimeout(handleSubscribe, TIMEOUT);
    });
  }

  function offSubscribe() {
    window.removeEventListener("resize", function () {
      setTimeout(handleSubscribe, TIMEOUT);
    });
  }

  function setMovies() {
    let movies = [];
    foundMovies.forEach((item, i) => {
      if (i < maxEl) {
        movies.push(item);
      }
    });
    setRenderedMovies(movies);
  }

  function handleAddButtonClick() {
    const display = window.innerWidth;
    if (display < WIDTH_768PX) {
      setMaxEl(maxEl + 2);
    } else if (display < WIDTH_1025PX) {
      setMaxEl(maxEl + 2);
    } else if (display < WIDTH_1260PX) {
      setMaxEl(maxEl + 2);
    } else {
      setMaxEl(maxEl + 3);
    }
  }

  return (
    <div className="cards">
      <ul className="card-list">
        {renderedMovies.map((item) => (
          <MoviesCard
            key={item.id || item._id}
            movie={item}
            onSaveMovie={onSaveMovie}
            savedMovies={savedMovies}
            onDeleteMovie={onDeleteMovie}
          />
        ))}
      </ul>
      {foundMovies.length !== renderedMovies.length && pathname === '/movies' ?(
        <button
          className="card-list__still"
          type="button"
          onClick={handleAddButtonClick}
        >
          Ещё
        </button>
      ) : (
        ""
      )}
      {pathname === '/saved-movies' ?
        <div className="movies-list__saved-devider"></div>
        :
        ""}
    </div>
  );
}
