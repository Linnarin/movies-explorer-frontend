import React, { useEffect, useState } from "react";
import Tumblr from "../Tumblr/Tumblr";

function SearchForm(props) {
  const { onChangeShort, shortStatus, onSearch, value } = props;

  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    if (value) {
      setInputValue(value);
    }
  }, [value]);

  const changeInput = (event) => {
    setInputValue(event.target.value);

    if (event.target.value === "") {
      setInputError("Нужно ввести ключевое слово");
    } else {
      setInputError("");
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSearch(inputValue);
  };

  return (
    <article className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit}>
        <div className="search-form__container">
          <input
            className="search-form__input"
            placeholder="Фильм"
            value={inputValue}
            onChange={changeInput}
            required
          />
          <button className="search-form__submit button" type="submit"></button>
        </div>
        <Tumblr onChangeShort={onChangeShort} shortStatus={shortStatus} />
      </form>
      <span className="search__form-error">{inputError}</span>
    </article>
  );
}

export default SearchForm;
