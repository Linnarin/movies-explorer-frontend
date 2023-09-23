import React from "react";
import Tumblr from "../Tumblr/Tumblr";

function SearchForm() {
  return (
    <article className="search-form">
      <form className="search-form__form">
        <div className="search-form__container">
          <input className="search-form__input" placeholder="Фильм" required></input>
          <button className="search-form__submit button" type="submit"></button>
        </div>
        <Tumblr></Tumblr>
      </form>
    </article>
  );
}

export default SearchForm;
