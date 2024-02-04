import { React, useEffect, useState } from 'react';
import './Login.css';
import { Link } from "react-router-dom";
import loginLogo from "../../images/logo-header.svg";

export default function Login({ onLogin, isLoading }) {

  const [formValues, setFormValues] = useState({
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

  const isValid = formValues.email.isValid && formValues.password.isValid;

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
    isLoading ? setDisabled(true) : setDisabled(false);
  }, [isLoading]);

  useEffect(() => {
    isValid ? setDisabled(false) : setDisabled(true);
  }, [isValid]);

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({
      email: formValues.email.value,
      password: formValues.password.value
    });
  }
  return (
    <main className='login'>
      <Link className="login__logo" to='/' />
      <p className="login__title">Рады видеть!</p>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-form__label">E-mail</label>
        <input
          id="login-email-input"
          name="email"
          // className="login__email"
          className={`login__email ${formValues.email.errorMessage && "register__input-error"
            }`}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          value={formValues.email.value || ""}
          onChange={handleChange}
          type="email"
          required
          placeholder="Введите email"
        />
        <span className="login__name-error" />
        {formValues.email.errorMessage}
        <label className="login-form__label">Пароль</label>
        <input
          className={`login__password ${formValues.password.errorMessage && "register__input-error"
            }`}
          name="password"
          value={formValues.password.value || ""}
          onChange={handleChange}
          type="password"
          required
          placeholder="Введите пароль"
        />
        <span className="login__name-error" />
        {formValues.password.errorMessage}
        <input
          type="submit"
          value="Войти"
          className={`login__submit login__submit-button ${
            isValid && !isLoading ? "" : "register__submit-button-disabled"
          }`}
          disabled={disabled}
          />
        <p className="login__text">Ещё не зарегистрированы? <Link to="/sign-up" className="login__link">Регистрация</Link></p>
      </form>
    </main>
  )
}
