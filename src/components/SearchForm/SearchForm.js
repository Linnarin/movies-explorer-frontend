import React from "react";
import TumblrCheckbox from "../Tumblr/Tumblr";

function SearchForm() {
  return (
    <article className="search-form">
      <form className="search-form__form">
        <div className="search-form__container">
          <input className="search-form__input" placeholder="Фильм"></input>
          <button className="search-form__submit button"></button>
        </div>
        <TumblrCheckbox></TumblrCheckbox>
      </form>
    </article>
  );
}

export default SearchForm;
