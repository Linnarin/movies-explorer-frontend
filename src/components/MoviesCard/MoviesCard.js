import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function MoviesCard({ movie }) {
  const { handleMovieSave, handleMovieDelete } = useContext(CurrentUserContext);
  const location = useLocation();
  const pathMovies = location.pathname === "/movies";
    return (
    <li className="movie-card">
      <div className="movie-card__picture">
        <a href={movie.trailerLink} target="blank">
          <img
            src={movie.image}
            alt={movie.nameRU}
            className="movie-card__image"
          />
        </a>
        {movie._id ? (
          <button
            className={`movie-card__del movie-card__fav-position  ${pathMovies ? 'movie-card__del-from-movie' : 'movie-card__del-from-saved-movie'}`}
            onClick={() => {
              handleMovieDelete(movie);
            }}
            type="button"
          ></button>
        ) : (
          <button
            className="movie-card__fav movie-card__fav-position"
            onClick={() => handleMovieSave(movie)}
            type="button"
          >
            Сохранить
          </button>
        )}
      </div>
      <div className="movie-card__description">
        <h2 className="movie-card__title">{movie.nameEN}</h2>
        <div className="movie-card__dur-container">
          <p className="movie-card__dur">{movie.duration}</p>
        </div>
      </div>
    </li>
  );
}

export default MoviesCard;
