import React, { useContext, useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Movies() {
  const { movies, isLoading, onSearch } = useContext(CurrentUserContext);
  const [short, setShort] = useState(false);
  const [searchMovies, setSearchMovies] = useState([]);
  const [search, setSearch] = useState("");

  const handleShort = (data) => {
    setShort(data)
    localStorage.setItem("short", data);
    }

  const handleSearchMovies = (text) => {
    onSearch()
    onSearchHandler(text)
  }

    const onSearchHandler = (data) => {
      if (data) {
        const newMovies = movies.filter(
          (movie) =>
            movie.nameRU.toLowerCase().indexOf(data.toLowerCase()) !== -1 ||
            movie.nameEN.toLowerCase().indexOf(data.toLowerCase()) !== -1
        );
        setSearchMovies(newMovies);
      } else {
        setSearchMovies([]);
      }
      setSearch(data);
      localStorage.setItem("searchMoviesText", data);
  };
  useEffect(() => {
    const searchMoviesText = localStorage.getItem("searchMoviesText");
    if (searchMoviesText && searchMoviesText.length && movies.length) {
      onSearchHandler(searchMoviesText);
    } else {
      setSearchMovies([])
	}
	const isShort = localStorage.getItem("short");
    if (isShort) {
      handleShort(isShort === 'true');
    }
  }, [movies]);


  return (
    <section className="movies">
      <SearchForm
        onChangeShort={handleShort}
        shortStatus={short}
        onSearch={handleSearchMovies}
        value={search}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList movies={searchMovies}  search={search} short={short}></MoviesCardList>
      )}
    </section>
  );
}

export default Movies;
