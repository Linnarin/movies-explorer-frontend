import React from "react";
import savedMovies from "../../utils/SavedMovies";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies() {
  return (
    <section className="saved-movies">
      <SearchForm></SearchForm>
      {/* <Preloader></Preloader> */}
      <MoviesCardList movies={savedMovies}></MoviesCardList>
    </section>
  );
}

export default SavedMovies;
