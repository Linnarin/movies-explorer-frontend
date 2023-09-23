import React from "react";
import profilePhoto from "../../images/photo.jpg";

function AboutMe() {
  return (
    <section className="about-me" id="student">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__info">
        <div className="about-me__description">
          <h3 className="about-me__description-title">Алина</h3>
          <p className="about-me__description-subtitle">
            Фронтенд-разработчик, 26 лет
          </p>
          <p className="about-me__description-text">
            Я родилась и живу в Москве, закончила экономический факультет в Фу при правительстве РФ. Работаю сейчас в банке. У
            меня есть муж и замечательная собака. После того как пройду курсы по веб-разработке
            планирую заниматься фриланс заказами и улучшать свои навыки
            разработчика.
          </p>
          <a href="https://github.com/Linnarin" className="about-me__description-link link" target="_blank" rel="noreferrer">
            Github
          </a>
        </div>
        <div className="about-me__photo">
          <img src={profilePhoto} alt="Аватар профиля" className="about-me__photo-image" />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
