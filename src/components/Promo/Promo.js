import React from 'react'
import './Promo.css';

export default function Promo() {
  return (
    <div className='promo'>
      <p className="promo__title">Учебный проект студента факультета Веб-разработки.</p>
      <div className="promo__buttons">
        <a className="promo__button" href="#project">О проекте</a>
        <a className="promo__button" href="#techs">Технологии</a>
        <a className="promo__button" href="#about">Студент</a>
      </div>
    </div>
  )
}
