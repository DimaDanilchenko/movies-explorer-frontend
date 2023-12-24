import React from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';

export default function Profile(props) {
  return (
    <div className='profile'>
      <p className="profile__title">Привет, {props.name}!</p>
      <div className="profile__name-data">
        <p className="profile__name-title">Имя</p>
        <p className="profile__name-subtitle">Виталий {props.name}</p>
      </div>
      <div className="profile__line"></div>
      <div className="profile__email-data">
        <p className="profile__email-title">E-mail</p>
        <p className="profile__email-subtitle">pochta@yandex.ru {props.email}</p>
      </div>
      <button className="profile__redaction">Редактировать</button>
      <Link className="profile__out" to="/" onClick={props.onSignOut}>Выйти из аккаунта</Link>
    </div>
  )
}
