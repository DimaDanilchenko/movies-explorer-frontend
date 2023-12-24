import React from 'react';
import './AboutProject.css';

export default function AboutProject() {
  return (
    <div className='about-project'>
      <p className="about-project__title">О проекте</p>
      <div className="about-project__line"></div>
      <div className="about-project__about-project">
        <div className="about-project__about-inlude">
          <p className="about-project__about-inlude-title">Дипломный проект включал 5 этапов</p>
          <p className="about-project__about-inlude-subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__about-include">
          <p className="about-project__about-inlude-title">На выполнение диплома ушло 5 недель</p>
          <p className="about-project__about-inlude-subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__time-project">
        <div className="about-project__backend">
          <p className="about-project__backend-title">1 неделя</p>
          <p className="about-project__backend-subtitle">Back-end</p>
        </div>
        <div className="about-project__frontend">
          <p className="about-project__frontend-title">4 недели</p>
          <p className="about-project__frontend-subtitle">Front-end</p>
        </div>
      </div>
    </div>
  )
}
