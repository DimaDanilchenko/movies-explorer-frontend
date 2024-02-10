import { React, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';
import headerLogo from '../../images/logo-header.svg';

const Header = ({ loggedIn }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [navigationVisible, setNavigationVisible] = useState(false);

  const openNavMenu = function () {
    setNavigationVisible(true);
  }

  const closeNavMenu = function () {
    setNavigationVisible(false);
  }

  return (
    <>
      <header className='header'>
        <div className="header__container">
          <img className='header__logo' src={headerLogo} alt='Логотип хэдера' onClick={() => navigate('/')}></img>
          {location.pathname === '/' ? (
            !loggedIn ? (
              <>
                <button
                  type="button"
                  className='header__button_burger'
                  onClick={openNavMenu}
                ></button>
                <nav className='header__links'>
                  <button type="button" className='header__button header__button_bg_transparent' onClick={() => navigate('/signup')}>Регистрация</button>
                  <button type="button" className='header__button' onClick={() => navigate('/signin')}>Войти</button>
                </nav>
              </>
            ) :
              (
                <>
                  <button
                    type="button"
                    className='header__button_burger'
                    onClick={openNavMenu}
                  ></button>
                  <div className='header__links'>
                    <Link className='header__link' to='/movies'>Фильмы</Link>
                    <Link className='header__link' to='/saved-movies'>Сохранённые фильмы</Link>
                  </div>
                  <Link className='header__button_account' to='/profile'>Аккаунт</Link>
                </>
              )
          ) :
            (
              <>
                <button
                  type="button"
                  className='header__button_burger'
                  onClick={openNavMenu}
                ></button>
                <div className='header__links'>
                  <Link className='header__link header__link_fw_bold' to='/movies'>Фильмы</Link>
                  <Link className='header__link' to='/saved-movies'>Сохранённые фильмы</Link>
                </div>
                <Link className='header__button_account' to='/profile'>Аккаунт</Link>
              </>
            )}
        </div>
      </header>
      <Navigation loggedIn={loggedIn} closeNavMenu={closeNavMenu} navigationVisible={navigationVisible} />
    </>
  );
}

export default Header;
