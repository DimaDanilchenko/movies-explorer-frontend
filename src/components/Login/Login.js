import React from 'react';
import './Login.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import loginLogo from "../../images/logo-header.svg";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(email, password);
    setEmail("");
    setPassword("");
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  return (
    <div className='login'>
      <Link className="login__logo" to='/' />
      <p className="login__title">Рады видеть!</p>
      <form className="login-form" onSubmit={handleSubmit}>
      <label className="login__label">E-mail</label>
        <input
          id="login-email-input"
          type="email"
          name="email"
          className="login__email"
          onChange={handleEmailChange}
          value={email}
          required=""
        />
        <span className="login__name-error" />
        <label className="login__label">Пароль</label>
        <input
          id="login-password-input"
          type="password"
          name="password"
          className="login__password"
          onChange={handlePasswordChange}
          value={password}
          required=""
        />
        <span className="login__name-error" />
        <input type="submit" value="Войти" className="login__submit" />
        <p className="login__text">Ещё не зарегистрированы? <Link to="/sign-up" className="login__link">Регистрация</Link></p>
      </form>
    </div>
  )
}
