import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import headerLogo from "../../images/logo-header.svg";
import headerLogoProfile from "../../images/profile-header.svg";

export default function Header(props) {
  const location = useLocation();
  const path = location.pathname === "/sign-in" ? "/sign-up" : "/sign-in";
  return (
    <div className='header'>
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      {props.loggedIn ? (
        <>
          <div className="header__links-in">
            <Link className="header__link" to="/movies" >Фильмы</Link>
            <Link className="header__link" to="/saved-movies" >Сохранённые фильмы</Link>
          </div>
          <img src={headerLogoProfile} alt="" className="header__logo-profile" />
        </>
      ) : (
        <div className="header__links">
          <Link className="header__link-reg" to="/sign-up" >Регистрация</Link>
          <Link className="header__link-in" to="/sign-in" >Войти</Link>
        </div>
      )}
    </div>
  )
}
