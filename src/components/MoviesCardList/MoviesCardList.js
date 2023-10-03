import React, { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { DEVICE_PARAMS, SHORTMOVIE } from "../../utils/constatns";
import { useLocation } from "react-router-dom";

function MoviesCardList({ movies, search, short }) {
  const [width, setWidth] = useState(window.innerWidth);
  const [moviesListLength, setmoviesListLength] = useState(12);
  const [loadMoreCards, setLoadMoreCards] = useState(3);
  const location = useLocation();
  const {desktop, tablet, mobile} = DEVICE_PARAMS;

  const cardsLength =
    location.pathname === "/saved-movies" ? movies.length : moviesListLength;
  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (width > desktop.width) {
      setmoviesListLength(desktop.cards.total);
      setLoadMoreCards(desktop.cards.more);
    } else if (width <= desktop.width && width >= tablet.width) {
      setmoviesListLength(tablet.cards.total);
      setLoadMoreCards(tablet.cards.more);
    } else {
      setmoviesListLength(mobile.cards.total);
      setLoadMoreCards(mobile.cards.more);
    }
  }, [width]);

  const loadMore = () => {
    setmoviesListLength((prev) => prev + loadMoreCards);
  };

  const sortMovies = movies.filter(
    (item) => !short || item.duration <= SHORTMOVIE
  );

  return (
    <section className="movies-cards">
      <ul className="movies-cards__list">
        {sortMovies.slice(0, cardsLength).map((movie) => {
          return (
            <React.Fragment key={movie._id}>
              <MoviesCard movie={movie} />
            </React.Fragment>
          );
        })}
      </ul>
      {sortMovies.length === 0 && search.length > 0 && (
        <span>Ничего не найдено</span>
      )}
      {sortMovies.length > cardsLength && (
        <button
          className="movies-cards__more-button button"
          onClick={loadMore}
          type="button"
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
