import React from 'react'
import './Promo.css';
import { Link } from 'react-router-dom';

export default function Promo() {
  return (
    <div className='promo'>
      <p className="promo__title">Учебный проект студента факультета Веб-разработки.</p>
      <div className="promo__buttons">
        <Link to='#project' className="promo__button">О проекте</Link>
        <Link className="promo__button">Технологии</Link>
        <Link className="promo__button">Студент</Link>
      </div>
    </div>
  )
}
