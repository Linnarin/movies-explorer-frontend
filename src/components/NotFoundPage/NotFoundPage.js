import React from "react";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }
  return (
    <section className="not-found-page">
      <h3 className="not-found-page__tile">404</h3>
      <p className="not-found-page__subtile">Страница не найдена</p>
      <button className="not-found-page__button" onClick={goBack} type="button">
        Назад
      </button>
    </section>
  );
}

export default NotFoundPage;
