import React from 'react';
import './NavTab.css';

export default function NavTab() {
  return (
    <div className='nav-tab'>
      <p className="nav-tab__title">О проекте</p>
      <div className="nav-tab__line"></div>
      <div className="nav-tab__about-project">
        <div className="nav-tab__about-inlude">
          <p className="nav-tab__about-inlude-title">Дипломный проект включал 5 этапов</p>
          <p className="nav-tab__about-inlude-subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="nav-tab__about-include">
          <p className="nav-tab__about-inlude-title">На выполнение диплома ушло 5 недель</p>
          <p className="nav-tab__about-inlude-subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="nav-tab__time-project">
      <div className="nav-tab__backend">
        <p className="nav-tab__backend-title">1 неделя</p>
        <p className="nav-tab__backend-subtitle">Back-end</p>
      </div>
      <div className="nav-tab__frontend">
        <p className="nav-tab__frontend-title">4 недели</p>
        <p className="nav-tab__frontend-subtitle">Front-end</p>
      </div>
      </div>
    </div>
  )
}
