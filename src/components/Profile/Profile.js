import { React, useContext, useState, useEffect } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Profile({ onSignOut, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const [disabled, setDisabled] = useState(false);

  const [formValues, setFormValues] = useState({
    name: {
      value: "",
      isValid: true,
      errorMessage: ""
    },
    email: {
      value: "",
      isValid: true,
      errorMessage: ""
    }
  });

  const isValid = formValues.name.isValid && formValues.email.isValid;

  useEffect(() => {
    isValid === true ? setDisabled(false) : setDisabled(true);
  }, [isValid]);

  useEffect(() => {
    isLoading ? setDisabled(true) : setDisabled(false);
  }, [isLoading]);

  useEffect(() => {
    if (
      currentUser.name === formValues.name.value &&
      currentUser.email === formValues.email.value
    ) {
      setDisabled(true);
    } else if (isValid) {
      setDisabled(false);
    } else if (!isValid) {
      setDisabled(true);
    }
  }, [currentUser, formValues, isValid]);

  useEffect(() => {
    setFormValues({
      name: {
        value: currentUser.name,
        isValid: true,
        errorMessage: ""
      },
      email: {
        value: currentUser.email,
        isValid: true,
        errorMessage: ""
      }
    });
  }, [currentUser]);

  function handleChange(e) {
    const { name, value, validity, validationMessage } = e.target;
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

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: formValues.name.value,
      email: formValues.email.value
    });
  }

  return (
    <>
      <Header />

      <section className="profile">
        <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>

        <div className="profile__container">
          <form
            name="edit-profile"
            className="profile__form"
            onSubmit={handleSubmit}
            noValidate
          >
            <label
              className={`profile__info-container ${formValues.name.isValid ? "" : "profile__info-container__error"
                }`}
            >
              <span>Имя</span>
              <input
                minLength="2"
                maxLength="30"
                type="text"
                name="name"
                required
                className="profile__input"
                value={formValues.name.value || ""}
                onChange={handleChange}
              />
            </label>

            <label
              className={`profile__info-container ${formValues.email.isValid ? "" : "profile__info-container__error"
                }`}
            >
              <span>E-mail</span>
              <input
                type="email"
                name="email"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                className="profile__input"
                value={formValues.email.value || ""}
                onChange={handleChange}
              />
            </label>
            <span className="profile__error-span">
              {formValues.name.errorMessage}
            </span>
            <span className="profile__error-span">
              {formValues.email.errorMessage}
            </span>
            <button
              className={`profile__edit-button ${disabled ? "profile__edit-button_disabled" : ""
                }`}
              type="submit"
              disabled={disabled}
            >
              Редактировать
            </button>
          </form>

          <Link to="/" className="profile__signout" onClick={onSignOut}>
            Выйти из аккаунта
          </Link>
        </div>
      </section>
    </>

  )
}
