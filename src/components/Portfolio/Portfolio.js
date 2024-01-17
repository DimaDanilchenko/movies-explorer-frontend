import React from 'react';
import './Portfolio.css';
import { Link, useLocation } from 'react-router-dom';

export default function Portfolio() {
  return (
    <section className='portfolio'>
      <div className="portfolio__container">
        <p className="portfolio__title">Портфолио</p>
        <div className="portfolio__links">
          <Link className="portfolio__link" to='' target="_blank">Статичный сайт</Link>
          <Link className="portfolio__image" target="_blank"></Link>
        </div>
        <div className="portfolio__line"></div>
        <div className="portfolio__links">
          <Link className="portfolio__link" to='' target="_blank">Адаптивный сайт</Link>
          <Link className="portfolio__image" target="_blank"></Link>
        </div>
        <div className="portfolio__line"></div>
        <div className="portfolio__links">
          <Link className="portfolio__link" to='' target="_blank" >Одностраничное приложение</Link>
          <Link className="portfolio__image" target="_blank"></Link>
        </div>
      </div>
    </section>
  )
}
