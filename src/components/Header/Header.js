import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import headerLogo from "../../images/logo-header.svg";
import headerLogoProfile from "../../images/profile-header.svg";
import headerBurgerLogo from "../../images/menu-burger.svg";

export default function Header(props) {
  const location = useLocation();
  const [burgerMenu, setBurgerMenu] = useState(false); // состояние меню
  const handleToggleMenu = () => setBurgerMenu(!burgerMenu);

  const path = location.pathname === "/sign-in" ? "/sign-up" : "/sign-in";
  return (
    <div className="header">
      <div className="burger-menu">
        <Link className="burger-menu__logo" src={headerLogo} to='/' />
        <button className="burger-menu__image" onClick={handleToggleMenu}></button>
        <div className={`burger-menu__container ${burgerMenu ? 'burger-menu__container_visible' : ''}`}>
          <div className="burger-menu__links">
            <Link className="burger-menu__link" to="/" >Главная</Link>
            <Link className="burger-menu__link" to="/movies" >Фильмы</Link>
            <Link className="burger-menu__link" to="/saved-movies" >Сохранённые фильмы</Link>
            <Link to="/profile" className="burger-menu__logo-profile" />
          </div>
        </div>
      </div>
      <div className='header-menu'>
        <Link className="header-menu__logo" src={headerLogo} to='/' />
        {props.loggedIn ? (
          <>
            <div className="header__links-in">
              <Link className="header__link" to="/movies" >Фильмы</Link>
              <Link className="header__link" to="/saved-movies" >Сохранённые фильмы</Link>
            </div>
            <Link src={headerLogoProfile} to="/profile" className="header__logo-profile" />
          </>
        ) : (
          <div className="header__links">
            <Link className="header__link-reg" to="/sign-up" >Регистрация</Link>
            <Link className="header__link-in" to="/sign-in" >Войти</Link>
          </div>
        )}
      </div>
    </div>
  )
}
