import React from 'react';
import './Register.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import registerLogo from "../../images/logo-header.svg";

export default function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(email, password);
    setEmail("");
    setPassword("");
    setName("");
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  return (
    <div className='register'>
      <Link className="register__logo" to='/' />
      <p className="register__title">Добро пожаловать!</p>
      <form className="register-form" onSubmit={handleSubmit}>
        <label className="register__label">Имя</label>
        <input
          id="register-name-input"
          type="text"
          name="name"
          className="register__name"
          onChange={handleNameChange}
          value={name}
          required=""
          minLength={2}
          maxLength={40}
        />
        <span className="register__name-error" />
        <label className="register__label">E-mail</label>
        <input
          id="registeer-email-input"
          type="email"
          name="email"
          className="register__email"
          onChange={handleEmailChange}
          value={email}
          required=""
        />
        <span className="register__name-error" />
        <label className="register__label">Пароль</label>
        <input
          id="registeer-password-input"
          type="password"
          name="password"
          className="register__password"
          onChange={handlePasswordChange}
          value={password}
          required=""
        />
        <span className="register__name-error" />
        <input type="submit" value="Зарегистрироваться" className="register__submit" />
        <p className="register__text">Уже зарегистрированы? <Link to="/sign-in" className="register__link">Войти</Link></p>
      </form>
    </div>
  )
}
