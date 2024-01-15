import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className='footer'>
      <div className="footer__container">
        <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__line"></div>
        <div className="footer__info">
          <p className="footer__year">&copy; 2023</p>
          <div className="footer__links">
            <Link className="footer__link" to='' target="_blank" >Яндекс.Практикум</Link>
            <Link className="footer__link" to='https://github.com/DimaDanilchenko/movies-explorer-frontend' target="_blank" >Github</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
