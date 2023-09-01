import React from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }
  return (
    <section className="not-found-page">
      <h1 className="not-found-page__tile">404</h1>
      <p className="not-found-page__subtile">Страница не найдена</p>
      <button className="not-found-page__button" onClick={goBack}>
        Назад
      </button>
    </section>
  );
}

export default PageNotFound;
