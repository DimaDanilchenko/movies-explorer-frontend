import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import api from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import * as auth from "../../utils/auth";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState('');
  const [allMovies, setAllMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [email, setEmail] = useState(null);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [status, setStatus] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesCopy, setSavedMoviesCopy] = useState([]);

  const [savedMoviesIds, setSavedMoviesIds] = useState([]);

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    moviesApi.getInitialMovies()
      .then(data => {
        setAllMovies(state => [...state, ...data]);
      })
      .catch(console.error)
    api.getUserProfile(jwt)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    mainApi
      .getSavedMovies()
      .then(data => {
        setSavedMovies(state => [...state, ...data]);
        const ids = data.map(el => {
          return el.movieId;
        })
        setSavedMoviesIds(ids);
      })
      .catch(console.error)
  }, []);


  useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        auth
          .tokenCheck(jwt)
          .then((res) => {
            if (res) {
              setEmail(res.email);
              setCurrentUser(res);
              setLoggedIn(true);
              navigate("/");
            }
          })
          .catch((err) => {
            localStorage.removeItem('jwt');
            console.log(err);
            navigate("/signin");
          });
      }
    }
  }

  function handleLogin( email, password) {
    auth
      .loginUser(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("jwt", res.token);
          tokenCheck();
          setLoggedIn(true);
          console.log(loggedIn);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpen(true);
        setStatus(false);
        navigate('/signin', { replace: true });
      });
  }

  function handleRegister(name, email, password) {
    auth.registerUser(name, email, password)
      .then((res) => {
        if (res) {
          setIsInfoTooltipOpen(true);
          setStatus(true);
          console.log(loggedIn);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpen(true);
        setStatus(false);
      });
  }
  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  function handleMovieSave(movie) {
    console.log(movie);
    mainApi
    .createMovie(movie)
    .then((res) => {
      setSavedMovies(savedMovies.concat(res));
      setSavedMoviesCopy(savedMoviesCopy.concat(res));
    })
    .catch(console.error)
  }

  const deleteMovie = function(id) {
    console.log(id);
    mainApi.removeMovie(id)
    .then(res => {
      const newSavedMovies = savedMovies.filter(el => {
        return el.movieId !== res.movieId;
      })
      setSavedMovies(newSavedMovies);
      setSavedMoviesIds(newSavedMovies.map(el => el.movieId))
    })
    .catch(err => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' ? <Header loggedIn={loggedIn} /> : ''}
        <Routes>
          <Route
            path="/"
            element={
              <Main
                loggedIn={loggedIn}
              />}
          />
          <Route path="/signup" element={
            <Register onRegister={handleRegister} />}
          />
          <Route path="/signin" element={
            <Login onLogin={handleLogin} />}
          />
          <Route path="/profile" element={
            <Profile userInfo={userInfo} onSignOut={handleSignOut}/>}
          />
          <Route path="/movies" element={
            <Movies 
            allMovies={allMovies}
            saveMovie={handleMovieSave}
            savedMoviesIds={savedMoviesIds}
            savedMovies={savedMovies}
            deleteMovie={deleteMovie}
            />}
          />
          <Route path="/saved-movies" element={
            <SavedMovies 
              savedMovies={savedMovies}
              deleteMovie={deleteMovie}
            />}
          />
          <Route path="*" element={
            <PageNotFound />}
          />
        </Routes>
        {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' ? <Footer /> : ''}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
