import React from 'react';
import './AboutMe.css';
import studentImage from "../../images/student-image.png";
import { Link, useLocation } from 'react-router-dom';

export default function AboutMe() {
  return (
    <div className='about-me' id="about">
      <p className="about-me__title">Студент</p>
      <div className="about-me___line"></div>
      <div className="about-me__student">
        <div className="about-me__description">
          <p className="about-me__name">Дмитрий</p>
          <p className="about-me__name-title">Фронтенд-разработчик, 26 лет</p>
          <p className="about-me__name-subtitle">Я родился и живу в Москве, закончил факультет экономики СГУ.
            У меня есть жена. Я люблю слушать музыку, а ещё увлекаюсь бегом и футболом. Недавно начал кодить.
            С 2019 года работал в компании «СКБ Контур».
            После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <Link className="about-me__github" to='' >Github</Link>
        </div>
        <img src={studentImage} alt="" className="about-me__image" />
      </div>
    </div>
  )
}
