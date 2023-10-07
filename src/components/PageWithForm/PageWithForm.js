import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useFormWithValidation } from "../Validate/Validate";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function PageWithForm({
  title,
  name,
  buttonText,
  onSubmit,
  authDescription,
  authButtonText,
  authButtonLink,
  pageType,
}) {
  const { isError } = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) {
      return;
    }
    onSubmit({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <section className="page-form">
      <div className="page-form__container">
        <Link to="/" className="page-form__nav-link button">
          <img src={logo} alt="Логотип сайта" className="page-form__logo" />
        </Link>
        <h1 className="page-form__title">{title}</h1>
        <form
          name={`form-${name}`}
          method="post"
          className="page-form__form"
          id={`form-${name}`}
          action="/"
          onSubmit={handleSubmit}
        >
          <div className="page-form__inputs">
            {pageType === "register" ? (
              <label className="page-form__form-label">
                <span className="page-form__input-title">Имя</span>
                <input
                  type="text"
                  className="page-form__input"
                  name="name"
                  placeholder="Введите имя"
                  id="name-input"
                  required
                  onChange={handleChange}
                  minLength={2}
                  maxLength={30}
                  value={values.name || ""}
                />
                <span className="page-form__error">{errors.name}</span>
              </label>
            ) : null}
            <label className="page-form__form-label">
              <span className="page-form__input-title">E-mail</span>
              <input
                type="email"
                className="page-form__input"
                name="email"
                placeholder="Введите email"
                id="email-input"
                required
                onChange={handleChange}
                value={values.email || ""}
              />
              <span className="page-form__error">{errors.email}</span>
            </label>
            <label className="page-form__form-label">
              <span className="page-form__input-title">Пароль</span>
              <input
                type="password"
                className="page-form__input page-form__input-error"
                name="password"
                placeholder="Введите Пароль"
                id="password-input"
                required
                onChange={handleChange}
                minLength={2}
                maxLength={30}
                value={values.password || ""}
              />
              <span className="page-form__error">{errors.password}</span>
            </label>
          </div>
          <div className="page-form__submit-container">
            <button
              type="submit"
              disabled={!isValid}
              className="page-form__submit button"
            >
              {buttonText}
            </button>
            {isError[name] && (
              <span className="page-form__submit-error">
                {name === "register" && isError.register}
                {name === "login" && isError.login}
              </span>
            )}
          </div>
        </form>
        <div className="page-form__auth">
          <p className="page-form__auth-text">
            {authDescription}{" "}
            <Link to={authButtonLink} className="page-form__auth-link link">
              {authButtonText}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default PageWithForm;
