import React from "react";
import arrow from "../../images/arrow.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item button">
          <a
            href="https://github.com/Linnarin/how-to-learn"
            target="_blank"
            className="portfolio__link"
            rel="noreferrer"
          >
            <span className="portfolio__link-text">Статичный сайт</span>
            <img
              src={arrow}
              alt="Стрелочка ссылки"
              className="portfolio__link-image"
            />
          </a>
        </li>
        <li className="portfolio__item button">
          <a
            href="https://linnarin.github.io/russian-travel/"
            target="_blank"
            className="portfolio__link"
            rel="noreferrer"
          >
            <span className="portfolio__link-text">Адаптивный сайт</span>
            <img
              src={arrow}
              alt="Стрелочка ссылки"
              className="portfolio__link-image"
            />
          </a>
        </li>
        <li className="portfolio__item button">
          <a
            href="https://linnarin.students.nomoredomains.sbs"
            target="_blank"
            className="portfolio__link"
            rel="noreferrer"
          >
            <span className="portfolio__link-text">
              Одностраничное приложение
            </span>
            <img
              src={arrow}
              alt="Стрелочка ссылки"
              className="portfolio__link-image"
            />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
