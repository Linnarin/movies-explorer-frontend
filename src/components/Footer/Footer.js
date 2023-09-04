import React from "react";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();

  return (
    <footer
      className={`footer
        ${location.pathname === "/profile" ? "footer_hidden" : "footer_active"}`}
      >
      <h3 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__detale">
        <p className="footer__copyright">&copy; 2023. Алина Залевская</p>
        <ul className="footer__links">
          <li className="footer__links-item">
            <a href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer" className="footer__link link">Яндекс.Практикум</a>
          </li>
          <li className="footer__block-list-item">
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="footer__link link">Github</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
