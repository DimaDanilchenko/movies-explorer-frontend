import React from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import registerLogo from "../../images/logo-header.svg";

export default function Register({ onRegister, isLoading }) {
  const [formValues, setFormValues] = useState({
    name: {
      value: "",
      isValid: false,
      errorMessage: ""
    },
    email: {
      value: "",
      isValid: false,
      errorMessage: ""
    },
    password: {
      value: "",
      isValid: false,
      errorMessage: ""
    }
  });

  const [disabled, setDisabled] = useState(false);

  const isValid =
    formValues.name.isValid &&
    formValues.email.isValid &&
    formValues.password.isValid;

  function handleChange(e) {
    // деструктуризируем свойство target, получая значения инпутов и ошибки
    const { name, value, validity, validationMessage } = e.target;
    // устанавливаем новое состояние, обязательно совмещая с предыдущим
    // чтобы значения других инпутов не перезаписались на undefined
    setFormValues((prevState) => ({
      ...prevState,
      [name]: {
        ...formValues[name],
        value,
        isValid: validity.valid,
        errorMessage: validationMessage
      }
    }));
  }

  useEffect(() => {
    isValid ? setDisabled(false) : setDisabled(true);
  }, [isValid]);

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({
      name: formValues.name.value,
      email: formValues.email.value,
      password: formValues.password.value
    });
  }

  useEffect(() => {
    isLoading ? setDisabled(true) : setDisabled(false);
  }, [isLoading]);

  return (
    <main className='register'>
      <Link className="register__logo" to='/' />
      <p className="register__title">Добро пожаловать!</p>
      <form className="register-form" onSubmit={handleSubmit}>
        <label className="register-form__label">Имя</label>
        <input
          className={`register-form__name ${formValues.name.errorMessage && "register__input-error"
            }`}
          name="name"
          onChange={handleChange}
          value={formValues.name.value || ""}
          required
          minLength="2"
          maxLength="40"
          placeholder="Введите имя"
          id="register-name-input"
          type="text"
        />
        <span className="register__error-span">
          {formValues.name.errorMessage}
        </span>
        <label className="register-form__label">E-mail</label>
        <input
          id="registeer-email-input"
          placeholder='Введите адрес'
          required=""
          className={`register-form__email ${formValues.email.errorMessage && "register__input-error"
            }`}
          name="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          onChange={handleChange}
          value={formValues.email.value || ""}
          type="email"
        />
        <span className="register__error-span">
          {formValues.email.errorMessage}
        </span>
        <label className="register-form__label">Пароль</label>
        <input
          required=""
          className={`register-form__password ${formValues.password.errorMessage && "register__input-error"
            }`}
          name="password"
          onChange={handleChange}
          value={formValues.password.value || ""}
          type="password"
          placeholder="Введите пароль"
        />
        <span className="register__error-span">
          {formValues.password.errorMessage}
        </span>
        <input
          type="submit"
          value="Зарегистрироваться"
          className={`register-form__submit ${isValid && !isLoading ? "" : "register-form__submit_disabled"
            }`}
          disabled={disabled}
        />
        <p className="register-form__text">Уже зарегистрированы? <Link to="/signin" className="register-form__link">Войти</Link></p>
      </form>
    </main>
  )
}
