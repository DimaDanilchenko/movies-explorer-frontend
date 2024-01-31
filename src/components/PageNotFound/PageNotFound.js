import React from 'react';
import './PageNotFound.css';
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <main className='page-not-found'>
      <p className="page-not-found__title">404</p>
      <p className="page-not-found__subtitle">Страница не найдена</p>
      <Link to="/signin" className="page-not-found__link">Назад</Link>
    </main>
  )
}
