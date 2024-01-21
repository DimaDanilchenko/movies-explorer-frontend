import React from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

export default function Profile({ loggedIn, currentUser, onSignOut }) {
  return (
    <>
    <Header />
    <main className='profile'>
      <p className="profile__title">Привет, {currentUser.name}!</p>
      <div className="profile__name-data">
        <p className="profile__name-title">Имя</p>
        <p className="profile__name-subtitle">{currentUser.name}</p>
      </div>
      <div className="profile__line"></div>
      <div className="profile__email-data">
        <p className="profile__email-title">E-mail</p>
        <p className="profile__email-subtitle">{currentUser.email}</p>
      </div>
      <button type="button" className="profile__redaction">Редактировать</button>
      <Link className="profile__out" to="/" onClick={onSignOut}>Выйти из аккаунта</Link>
    </main>
    </>

  )
}
