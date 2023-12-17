import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import headerLogo from "../../images/logo-header.svg";
import headerProfile from "../../images/profile-header.svg";

export default function Header() {
  return (
    <div className='header'>
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      <div className="header__links">
        <Link className="header__link" to="/" >Фильмы</Link>
        <Link className="header__link" to="/" >Сохранённые фильмы</Link>
      </div>
      <img className="header__logo" src={headerProfile} alt="Логотип профиля"/>
    </div>
  )
}
