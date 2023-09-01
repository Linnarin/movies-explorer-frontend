import React from "react";

function AboutProject() {
  return (
    <section className="about-project" id="about">
      <h2 className="about-project__title">О проекте</h2>
      <ul className="about-project__list">
        <li className="about-project__description-first-column">
          <h3 className="about-project__description-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__description-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="about-project__description-second-column">
          <h3 className="about-project__description-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__description-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="about-project__progress">
        <div className="about-project__progress-backend">
          <p className="about-project__progress-backend-text">1 неделя</p>
          <p className="about-project__progress-item">Back-end</p>
        </div>
        <div className="about-project__progress-frontend">
          <p className="about-project__progress-frontend-text">
            4 недели
          </p>
          <p className="about-project__progress-item">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
