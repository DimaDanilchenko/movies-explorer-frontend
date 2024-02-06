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
  const [foundMovies, setFoundMovies] = useState([]);
  const [disabledCheckbox, setDisabledCheckbox] = useState(true);
  const [disabledCheckboxSaved, setDisabledCheckboxSaved] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    _id: ""
  });
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [savedMoviesCopy, setSavedMoviesCopy] = useState([]);
  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [preloaderStatus, setPreloaderStatus] = useState(false);
  const [checkboxStatus, setCheckboxStatus] = useState(true);

  function closePopup() {
    setIsTooltipPopupOpen(false);
  }

  useEffect(() => {
    if (loggedIn && currentUser) {
      getSavedMovies();
    }
  }, [loggedIn, currentUser]);

  function getSavedMovies() {
    mainApi
      .getSavedMovies()
      .then((data) => {
        const userMovies = data.filter((m) => m.owner === currentUser._id);
        setSavedMovies(userMovies);
        setSavedMoviesCopy(userMovies);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem("searchedMovies") &&
      localStorage.getItem("checkboxStatus")
    ) {
      const checkboxStatus = JSON.parse(localStorage.getItem("checkboxStatus"));
      handleSubmitCheckbox(checkboxStatus);
    }
  }, []);

  useEffect(() => {
    foundMovies.length !== 0
      ? setDisabledCheckbox(false)
      : setDisabledCheckbox(true);
  }, [foundMovies]);

  useEffect(() => {
    savedMovies.length !== 0 || savedMoviesCopy.length !== 0
      ? setDisabledCheckboxSaved(false)
      : setDisabledCheckboxSaved(true);
  }, [savedMovies, savedMoviesCopy]);

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
    localStorage.removeItem('auth');
    localStorage.removeItem('movieName');
    localStorage.removeItem('allMovies');
    localStorage.removeItem('isMoviesShort');
    localStorage.removeItem('checkboxStatus');
    localStorage.removeItem('searchedMovies');
    setCurrentUser({});
    navigate('/', { replace: true });
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

  function handleSaveMovie(movie) {
    mainApi
      .createMovie(movie)
      .then((res) => {
        setSavedMovies(savedMovies.concat(res));
        setSavedMoviesCopy(savedMoviesCopy.concat(res));
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteMovie(movie) {
    console.log(movie._id);
    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        const updateSavedMovies = savedMovies.filter(
          (item) => item._id !== movie._id
        );
        setSavedMovies(updateSavedMovies);
        setSavedMoviesCopy(
          savedMoviesCopy.filter((item) => item._id !== movie._id)
        );
      })
      .catch((err) => console.log(err));
  }

  function handleSearchMovie(movie, checked) {
    if (allMovies.length !== 0) {
      const searchMovies = allMovies.filter((item) =>
        item.nameRU.toLowerCase().includes(movie.toLowerCase())
      );
      if (searchMovies.length === 0) {
        setIsTooltipPopupOpen(true);
        setPopupText("По вашему запросу ничего не найдено..");
        setSuccess(false);
      } else {
        setCheckboxStatus(false);
        localStorage.setItem("movieName", movie);
        localStorage.setItem("searchedMovies", JSON.stringify(searchMovies));
        localStorage.setItem("checkboxStatus", JSON.stringify(checked));
        setFoundMovies(searchMovies);
      }
      return;
    } else {
      setPreloaderStatus(true);
      moviesApi
        .getInitialMovies()
        .then((moviesFromSearch) => {
          const searchMovies = moviesFromSearch.filter((item) =>
            item.nameRU.toLowerCase().includes(movie.toLowerCase())
          );
          if (searchMovies.length === 0) {
            setIsTooltipPopupOpen(true);
            setPopupText("По вашему запросу ничего не найдено.");
            setSuccess(false);
          } else {
            setCheckboxStatus(false);
            localStorage.setItem("allMovies", JSON.stringify(moviesFromSearch));
            setAllMovies(moviesFromSearch);
            localStorage.setItem("movieName", movie);
            localStorage.setItem(
              "searchedMovies",
              JSON.stringify(searchMovies)
            );
            localStorage.setItem("checkboxStatus", JSON.stringify(checked));
            setFoundMovies(searchMovies);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setPreloaderStatus(false));
    }
  }

  function handleSubmitCheckbox(checkbox) {
    let filteredMovies;
    let movies = JSON.parse(localStorage.getItem("searchedMovies"));
    if (checkbox) {
      filteredMovies = movies.filter((item) => item.duration <= 40);
    } else if (!checkbox) {
      filteredMovies = movies;
    }
    setFoundMovies(filteredMovies);
    localStorage.setItem("checkboxStatus", JSON.stringify(checkbox));
  }

  function handleSearchSavedMovie(query, checkbox) {
    setPreloaderStatus(true);
    const searchMovies = savedMovies.filter((item) =>
      item.nameRU.toLowerCase().includes(query.toLowerCase())
    );
    if (searchMovies.length === 0) {
      setIsTooltipPopupOpen(true);
      setPopupText("По вашему запросу ничего не найдено.");
      setSuccess(false);
      setPreloaderStatus(false);
    } else {
      setCheckboxStatus(false);
      localStorage.setItem("checkboxStatus", JSON.stringify(checkbox));
      setSavedMovies(searchMovies);
      setPreloaderStatus(false);
    }
  }

  function handleSavedMoviesSubmitCheckbox(checkbox) {
    if (checkbox) {
      setSavedMovies(savedMovies.filter((item) => item.duration <= 40));
    } else if (!checkbox) {
      setSavedMovies(savedMoviesCopy);
    }
    localStorage.setItem("checkboxStatusSavedMovies", JSON.stringify(checkbox));
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
              loggedIn={loggedIn}
              userInfo={currentUser}
              onSignOut={handleSignOut}
              onUpdateUser={handleUpdateUser}
              isLoading={isLoading}
            />}
          />
          <Route path="/movies" element={
            <Movies
              onSearch={handleSearchMovie}
              foundMovies={foundMovies}
              savedMovies={savedMovies}
              onSaveMovie={handleSaveMovie}
              onDeleteMovie={handleDeleteMovie}
              disabled={checkboxStatus}
              onSubmitCheckbox={handleSubmitCheckbox}
              disabledCheckbox={disabledCheckbox}
              preloaderStatus={preloaderStatus}
            />}
          />
          <Route path="/saved-movies" element={
            <SavedMovies
              onSearch={handleSearchSavedMovie}
              savedMovies={savedMovies}
              onSubmitCheckbox={handleSavedMoviesSubmitCheckbox}
              disabled={checkboxStatus}
              onDeleteMovie={handleDeleteMovie}
              onSaveMovie={handleSaveMovie}
              disabledCheckboxSaved={disabledCheckboxSaved}
              preloaderStatus={preloaderStatus}
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
