import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
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
import mainApi from '../../utils/MainApi';
import api from '../../utils/MoviesApi';
import * as auth from "../../utils/auth";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [email, setEmail] = useState(null);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isUserInfoChange, setIsUserInfoChange] = useState(false);
  const [status, setStatus] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    mainApi.getUserProfile(jwt)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(console.error)
  }, [])

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

  function handleLogin(email, password) {
    auth
      .loginUser(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("jwt", res.token);
          tokenCheck();
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
      console.log(loggedIn)
  }

  function handleRegister(email, password, name) {
    auth.registerUser(email, password, name)
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

  function saveMovie(data){
    console.log(data);
    mainApi.addNewCard(data, jwt)
    .then((newCard) => {
      setSavedMovies([newCard, ...data]);
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
            <Register onRegister={handleRegister} />}
          />
          <Route path="/signin" element={
            <Login onLogin={handleLogin} />}
          />
          <Route path="/profile" element={
            <Profile loggedIn={loggedIn} currentUser={currentUser} onSignOut={handleSignOut} />}
          />
          <Route path="/movies" element={
            <Movies loggedIn={loggedIn}
              saveMovie={saveMovie}
            />}
          />
          <Route path="/saved-movies" element={
            <SavedMovies loggedIn={loggedIn} jwt={jwt} />}
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
