import React from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from "react-router-dom";
import registerLogo from "../../images/logo-header.svg";

export default function Register(props) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(name, email, password);
    
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
    <main className='register'>
      <Link className="register__logo" to='/' />
      <p className="register__title">Добро пожаловать!</p>
      <form className="register-form" onSubmit={handleSubmit}>
        <label className="register-form__label">Имя</label>
        <input
          id="register-name-input"
          type="text"
          name="name"
          className="register-form__name"
          onChange={handleNameChange}
          placeholder='Введите имя'
          value={name}
          required=""
          minLength={2}
          maxLength={40}
        />
        <span className="register-form__name-error" />
        <label className="register-form__label">E-mail</label>
        <input
          id="registeer-email-input"
          type="email"
          name="email"
          className="register-form__email"
          onChange={handleEmailChange}
          placeholder='Введите адрес'
          value={email}
          required=""
        />
        <span className="register-form__name-error" />
        <label className="register-form__label">Пароль</label>
        <input
          id="registeer-password-input"
          type="password"
          name="password"
          className="register-form__password"
          onChange={handlePasswordChange}
          placeholder='Введите пароль'
          value={password}
          required=""
        />
        <span className="register-form__name-error" />
        <input type="submit" value="Зарегистрироваться" className="register-form__submit" />
        <p className="register-form__text">Уже зарегистрированы? <Link to="/signin" className="register-form__link">Войти</Link></p>
      </form>
    </main>
  )
}
