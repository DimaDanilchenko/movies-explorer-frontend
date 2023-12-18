import React from 'react'
import './Promo.css';

export default function Promo() {
  return (
    <div className='promo'>
      <p className="promo__title">Учебный проект студента факультета Веб-разработки.</p>
      <div className="promo__buttons">
        <button className="promo__button">О проекте</button>
        <button className="promo__button">Технологии</button>
        <button className="promo__button">Студент</button>
      </div>
    </div>
  )
}
