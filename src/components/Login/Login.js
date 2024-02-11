import React from "react";
import { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login({ handleLogin, loggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState("start");
  const [passwordError, setPasswordError] = useState("start");

  const [disabledButton, setDisabledButton] = useState(true);

  const blurHandler = (event) => {
    switch (event.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
    }
  };

  function handleEmailInput(evt) {
    blurHandler(evt);
    setEmail(evt.target.value);
    const reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (evt.target.value.length == 0) {
      setEmailError("Email не может быть пустым");
    } else {
      if (!reg.test(String(evt.target.value).toLowerCase())) {
        setEmailError("Некорректынй email");
      } else {
        setEmailError("");
      }
    }
  }

  function handlePasswordInput(evt) {
    blurHandler(evt);
    setPassword(evt.target.value);
    if (evt.target.value.length == 0) {
      setPasswordError("Пароль не может быть пустым");
    } else {
      if (evt.target.value.length < 3) {
        setPasswordError("Пароль не может быть меньше 4 символов");
      } else {
        if (evt.target.value.length > 29) {
          setPasswordError("Пароль не может быть больше 30 символов");
        } else {
          setPasswordError("");
        }
      }
    }
  }

  function handleDisableButton() {
    if (emailError == "") {
      if (passwordError == "") {
        setDisabledButton(false);
      } else {
        setDisabledButton(true);
      }
    } else {
      setDisabledButton(true);
    }
  }

  useEffect(() => {
    handleDisableButton();
  }, [emailError]);

  useEffect(() => {
    handleDisableButton();
  }, [passwordError]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin(email, password);
  };

  const navigate = useNavigate();
  return (
    <main>
      <form className="login" onSubmit={handleSubmit}>
        <div className="login__logo" onClick={() => navigate("/")}></div>
        <h2 className="login__title">Рады видеть!</h2>
        <div className="login__input-container">
          <p className="login__input-name">E-mail</p>
          <input
            className="login__input"
            type="text"
            name="email"
            required
            placeholder="E-mail"
            value={email}
            onChange={handleEmailInput}
          ></input>
          {emailDirty && emailError && (
            <span className="login__input-error">{emailError}</span>
          )}
        </div>
        <div className="login__input-container">
          <p className="login__input-name">Пароль</p>
          {passwordDirty && passwordError ? (
            <input
              className="login__input login__input_type_password"
              type="password"
              name="password"
              required
              placeholder="Пароль"
              value={password}
              autoComplete="on"
              onChange={handlePasswordInput}
            ></input>
          ) : (
            <input
              className="login__input"
              type="password"
              name="password"
              required
              placeholder="Пароль"
              value={password}
              autoComplete="on"
              onChange={handlePasswordInput}
            ></input>
          )}
          {passwordDirty && passwordError && (
            <span className="login__input-error">{passwordError}</span>
          )}
        </div>
        {disabledButton == true ? (
          <button className="login__button login__button_disabled">
            Войти
          </button>
        ) : (
          <button className="login__button" type="submit">
            Войти
          </button>
        )}
        <div className="login__already-container">
          <p className="login__already-text">Ещё не зарегистрированы?</p>
          <a className="login__already-link" href="/signup">
            Регистрация
          </a>
        </div>
      </form>
    </main>
  );
}

export default Login;
