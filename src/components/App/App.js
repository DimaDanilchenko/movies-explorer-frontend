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

function App() {
  const { pathname } = useLocation();
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <div className="app">
      {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile' ? <Header loggedIn={loggedIn} /> : ''}
      <Routes>
        <Route
          path="/"
          element={
            <Main></Main>}
          loggedIn={loggedIn}
        />
        <Route path="/sign-up" element={
          <Register />}
        />
        <Route path="/sign-in" element={
          <Login />}
        />
        <Route path="/profile" element={
          <Profile loggedIn={loggedIn} />}
        />
        <Route path="/movies" element={
          <Movies loggedIn={loggedIn} />}
        />
        <Route path="/movies" element={
          <SavedMovies loggedIn={loggedIn} />}
        />
        <Route path="*" element={
          <PageNotFound />}
        />
      </Routes>
      {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' ? <Footer /> : ''}
    </div>
  );
}

export default App;
