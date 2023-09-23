import React from "react";
import { useLocation } from "react-router-dom";

function MoviesCard(props) {
  const handleDeleteClick = () => {
    console.log();
  };

  const location = useLocation();

  return (
    <li className="movie-card">
      <div className="movie-card__picture">
        <img
          src={props.movie.link}
          alt={props.movie.name}
          className="movie-card__image"
        />
        {props.movie.savedFavorite ? (
          <button
            className={
              location.pathname === "/saved-movies"
                ? "movie-card__del movie-card__fav-position  movie-card__del-from-saved-movie"
                : "movie-card__del movie-card__fav-position  movie-card__del-from-movie"
            }
            type="button"
          ></button>
        ) : (
          <button
            className="movie-card__fav movie-card__fav-position"
            onClick={handleDeleteClick}
            type="button"
          >
            Сохранить
          </button>
        )}
      </div>
      <div className="movie-card__description">
        <h2 className="movie-card__title">{props.movie.name}</h2>
        <div className="movie-card__dur-container">
          <p className="movie-card__dur">{props.movie.duration}</p>
        </div>
      </div>
    </li>
  );
}

export default MoviesCard;
