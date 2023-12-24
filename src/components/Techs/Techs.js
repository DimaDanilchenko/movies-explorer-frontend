import React from 'react';
import './Techs.css';

export default function Techs() {
  return (
    <div className='techs'>
      <p className="techs__title">Технологии</p>
      <div className="techs__line"></div>
      <p className="techs__about">7 технологий</p>
      <p className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__technologies">
        <li className="techs__technology">HTML</li>
        <li className="techs__technology">CSS</li>
        <li className="techs__technology">JS</li>
        <li className="techs__technology">React</li>
        <li className="techs__technology">Git</li>
        <li className="techs__technology">Express.js</li>
        <li className="techs__technology">mongoDB</li>
      </ul>
    </div>
  )
}
