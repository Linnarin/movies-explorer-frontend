import React from "react";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();

  return (
    <footer
      className={
        location.pathname === "/profile" ? "footer__hidden " : "footer"
      }>
 <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__detale">
                <p className="footer__copyright">© 2023</p>
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
