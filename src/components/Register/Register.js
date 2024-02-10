import React from "react";
import { useState, useEffect } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

function Register({ handleRegister, loggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [nameDirty, setNameDirty] = useState(false);
  const [emailError, setEmailError] = useState("start");
  const [passwordError, setPasswordError] = useState("start");
  const [nameError, setNameError] = useState("start");

  const [disabledButton, setDisabledButton] = useState(true);

  const blurHandler = (event) => {
    switch (event.target.name) {
      case "name":
        setNameDirty(true);
        break;
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

  function handleNameInput(evt) {
    blurHandler(evt);
    setName(evt.target.value);
    if (evt.target.value.length == 0) {
      setNameError("Имя не может быть пустым");
    } else {
      if (evt.target.value.length < 2) {
        setNameError("Имя не может быть меньше 2 символов");
      } else {
        if (evt.target.value.length > 29) {
          setNameError("Имя не может быть больше 30 символов");
        } else {
          setNameError("");
        }
      }
    }
  }

  function handleDisableButton() {
    if (nameError == "") {
      console.log(nameError);
      if (emailError == "") {
        console.log(emailError);
        if (passwordError == "") {
          console.log(passwordError);
          setDisabledButton(false);
        } else {
          setDisabledButton(true);
        }
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

  useEffect(() => {
    handleDisableButton();
  }, [nameError]);

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegister({email, password, name});
  }

  return (
    <main>
      <form className="register" onSubmit={handleSubmit}>
        <div className="register__logo" onClick={() => navigate("/")}></div>
        <h2 className="register__title">Добро пожаловать!</h2>
        <div className="register__input-container">
          <p className="register__input-name">Имя</p>
          <input
            className="register__input"
            name="name"
            type="text"
            required
            placeholder="Имя"
            value={name}
            onChange={handleNameInput}
          ></input>
          {nameDirty && nameError && (
            <span className="register__input-error">{nameError}</span>
          )}
        </div>
        <div className="register__input-container">
          <p className="register__input-name">E-mail</p>
          <input
            className="register__input"
            name="email"
            type="text"
            required
            placeholder="E-mail"
            value={email}
            onChange={handleEmailInput}
          ></input>
          {emailDirty && emailError && (
            <span className="register__input-error">{emailError}</span>
          )}
        </div>
        <div className="register__input-container">
          <p className="register__input-name">Пароль</p>
          {passwordDirty && passwordError ? (
            <input
              className="register__input register__input_type_password"
              type="password"
              name="password"
              required
              placeholder="Пароль"
              value={password}
              onChange={handlePasswordInput}
            ></input>
          ) : (
            <input
              className="register__input"
              type="password"
              name="password"
              required
              placeholder="Пароль"
              value={password}
              onChange={handlePasswordInput}
            ></input>
          )}
          {passwordDirty && passwordError && (
            <span className="register__input-error">{passwordError}</span>
          )}
        </div>
        {disabledButton == true ? (
          <button className="register__button register__button_disabled">
            Зарегестрироваться
          </button>
        ) : (
          <button className="register__button" type="submit">
            Зарегестрироваться
          </button>
        )}
        <div className="register__already-container">
          <p className="register__already-text">Уже зарегистрированы?</p>
          <a className="register__already-link" href="/signin">
            Войти
          </a>
        </div>
      </form>
    </main>
  );
}

export default Register;
