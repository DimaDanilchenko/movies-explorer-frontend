import { React, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import searchFormImage from '../../images/find-3.svg';
import './SearchForm.css';

export default function SearchForm({ onSearch, onSubmitCheckbox, disabled, disabledSaved }) {
  const [inputSearchError, setInputSearchError] = useState({
    errorMessage: "",
    isValid: true
  });
  const [inputValue, setInputValue] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // эффект, который устанавливает значения полей input и checkbox, если они сохранены в памяти
    if (location.pathname === "/movies") {
      setInputValue(localStorage.getItem("movieName"));
      setCheckbox(JSON.parse(localStorage.getItem("checkboxStatus")));
      setInputSearchError({});
    } else if (location.pathname === "/saved-movies") {
      const checkboxStatus = JSON.parse(
        localStorage.getItem("checkboxStatusSavedMovies")
      );
      setCheckbox(checkboxStatus);
      onSubmitCheckbox(checkboxStatus);
    }
  }, [location]);

  useEffect(() => {
    inputSearchError.isValid &&
      setInputSearchError({
        isValid: true,
        errorMessage: ""
      });
  }, []);

  function handleChangeCheckbox() {
    setCheckbox(!checkbox);
    onSubmitCheckbox(!checkbox);
  }

  function handleInputChange(e) {
    setInputValue(e.target.value);
    if (e.target.value.length === 0) {
      setInputSearchError({
        isValid: e.target.validity.valid,
        errorMessage: "Введите ключевое слово"
      });
    } else {
      setInputSearchError({
        isValid: e.target.validity.valid,
        errorMessage: ""
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputValue) {
      return setInputSearchError({
        isValid: false,
        errorMessage: "Введите ключевое слово"
      });
    }
    onSearch(inputValue, checkbox);
  }

  return (
    <div className="search">
      <form
        name="search-movie"
        className="search__container"
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          className={`search__input ${
            !inputSearchError.isValid && "search__input_error"
          }`}
          placeholder="Фильм"
          required
          name="movie"
          type="text"
          value={inputValue || ""}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className={`search__button ${
            !inputSearchError.isValid ? "search__button_error" : ""
          }`}
          disabled={!inputSearchError.isValid}
        ></button>
      </form>
      <span className="search__input_invalid">
        {inputSearchError.errorMessage}
      </span>
      <div className="search__filter">
        <label className="search__filter-container">
          <input
            className="search__filter-checkbox"
            type="checkbox"
            checked={checkbox ? true : false}
            onChange={handleChangeCheckbox}
            disabled={
              location.pathname === "/movies" ? disabled : disabledSaved
            }
          />
          <span className="search__filter-toggle"></span>
          <span className="search__filter-caption">Короткометражки</span>
        </label>
      </div>
    </div>
  );
}
