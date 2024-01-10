import React from 'react';
import './Portfolio.css';
import { Link, useLocation } from 'react-router-dom';

export default function Portfolio() {
  return (
    <div className='portfolio'>
      <p className="portfolio__title">Портфолио</p>
      <div className="portfolio__links">
        <Link className="portfolio__link" to='' >Статичный сайт</Link>
        <Link className="portfolio__image"></Link>
      </div>
      <div className="portfolio__line"></div>
      <div className="portfolio__links">
        <Link className="portfolio__link" to='' >Адаптивный сайт</Link>
        <Link className="portfolio__image"></Link>
      </div>
      <div className="portfolio__line"></div>
      <div className="portfolio__links">
        <Link className="portfolio__link" to='' >Одностраничное приложение</Link>
        <Link className="portfolio__image"></Link>
      </div>
    </div>
  )
}
