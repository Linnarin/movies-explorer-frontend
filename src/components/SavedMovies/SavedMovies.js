import React, { useContext, useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { searchMoviesHandler } from "../../utils/searchMoviesHandler";

function SavedMovies() {
  const { savedMovies, isLoading } = useContext(CurrentUserContext);
  const [short, setShort] = useState(false);
  const [searchMovies, setSearchMovies] = useState([]);
  const [search, setSearch] = useState("");

  const onSearchHandler = (data) => {
    setSearchMovies(searchMoviesHandler(savedMovies, data));
    setSearch(data);
    
  };
  useEffect(() => {
    if (savedMovies) {
      setSearchMovies(searchMoviesHandler(savedMovies, search));
    }
  }, [savedMovies]);

  return (
    <section className="saved-movies">
      <SearchForm
        onChangeShort={setShort}
        shortStatus={short}
        onSearch={onSearchHandler}
        value={search}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          movies={searchMovies}
          search={search}
          short={short}
        ></MoviesCardList>
      )}
    </section>
  );
}

export default SavedMovies;
