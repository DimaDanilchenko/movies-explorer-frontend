import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import * as auth from "../../utils/auth";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './App.css';

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    _id: ""
  });
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [savedMoviesIds, setSavedMoviesIds] = useState([]);
  const [success, setSuccess] = useState(false);
  const [popupText, setPopupText] = useState("");
  const jwt = localStorage.getItem("jwt");

  function closePopup() {
    setIsTooltipPopupOpen(false);
  }

  useEffect(() => {
    moviesApi.getInitialMovies()
      .then((res) => {
        setAllMovies(res);
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    mainApi
      .getSavedMovies()
      .then(data => {
        setSavedMovies(data);
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
              setCurrentUser({
                name: res.name,
                email: res.email,
                _id: res._id
              });
              setLoggedIn(true);
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

  function handleLogin({ email, password }) {
    auth
      .loginUser({ email, password })
      .then((res) => {
        if (res) {
          localStorage.setItem("jwt", res.token);
          tokenCheck();
          console.log(loggedIn);
          navigate('/movies', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpen(true);
        setStatus(false);
        navigate('/signin', { replace: true });
      });
  }

  function handleRegister({ name, email, password }) {
    auth.registerUser({ name, email, password })
      .then(() => {
        handleLogin({ email, password })
        setIsInfoTooltipOpen(true);
        setStatus(true);
        console.log(loggedIn);
        navigate('/', { replace: true });
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

  function handleUpdateUser({ name, email }) {
    setIsLoading(true);
    mainApi
      .editUserInfo({ name, email })
      .then((newData) => {
        setCurrentUser({
          name: newData.name,
          email: newData.email
        });
        setIsTooltipPopupOpen(true);
        setSuccess(true);
        setPopupText("Данные успешно изменены.");
      })
      .catch((err) => {
        setIsTooltipPopupOpen(true);
        setSuccess(false);
        setPopupText(`Ошибка: ${err}`);
      })
      .finally(() => setIsLoading(false));
  }

  function handleMovieSave(movie) {
    console.log(movie);
    mainApi
      .createMovie(movie)
      .then((res) => {
        setSavedMovies(state => [...state, res]);
        setSavedMoviesIds([...savedMoviesIds, res.movieId])
      })
      .catch(console.error)
  }

  function handleDeleteMovie(movie) {
    console.log(movie._id);
    mainApi
      .deleteSavedMovie(movie._id, jwt)
      .then(res => {
        const newSavedMovies = savedMovies.filter(el => {
          return el.movieId !== res.movieId;
        })
        setSavedMovies(newSavedMovies);
        setSavedMoviesIds(newSavedMovies.map(el => el.movieId))
      })
      .catch(console.error)
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
            <Register
              onRegister={handleRegister}
              isLoading={isLoading}
            />}
          />
          <Route path="/signin" element={
            <Login
              onLogin={handleLogin}
              isLoading={isLoading}
            />}
          />
          <Route path="/profile" element={
            <Profile
              userInfo={currentUser}
              onSignOut={handleSignOut}
              onUpdateUser={handleUpdateUser}
              isLoading={isLoading}
            />}
          />
          <Route path="/movies" element={
            <Movies
              allMovies={allMovies}
              saveMovie={handleMovieSave}
              savedMoviesIds={savedMoviesIds}
              savedMovies={savedMovies}
              deleteMovie={handleDeleteMovie}
            />}
          />
          <Route path="/saved-movies" element={
            <SavedMovies
              savedMovies={savedMovies}
              deleteMovie={handleDeleteMovie}
            />}
          />
          <Route path="*" element={
            <PageNotFound />}
          />
        </Routes>
        <InfoTooltip
          isOpen={isTooltipPopupOpen}
          onClose={closePopup}
          success={success}
          text={popupText}
        />
        {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' ? <Footer /> : ''}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
