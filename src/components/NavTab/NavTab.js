import React from "react";
import { HashLink as Link } from "react-router-hash-link";

function NavTab() {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__list">
        <li className="nav-tab__item">
          <Link to="#about" className="nav-tab__link button" smooth>
            О проекте
          </Link>
        </li>
        <li className="nav-tab__item">
          <Link to="#techs" className="nav-tab__link button" smooth>
            Технологии
          </Link>
        </li>
        <li className="nav-tab__item">
          <Link to="#student" className="nav-tab__link button" smooth>
            Студент
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
