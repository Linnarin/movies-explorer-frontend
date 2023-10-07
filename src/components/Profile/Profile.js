import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../Validate/Validate";

function Profile({ updateInfoUser, handleLogOut }) {
  const { user, isError } = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const [isOneCange, setIsOneCange] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  function handleIsOneCange(e) {
    setIsOneCange(true);
  }

  function handleIsSave(e) {
    setIsOneCange(false);
  }

  useEffect(() => {
    if (user?.name) {
      resetForm({ name: user.name, email: user.email });
    }
  }, [user]);

  useEffect(() => {
    if (isError.updateUser === 400) {
      resetForm({ name: user.name, email: user.email });
    }
  }, [isError.updateUser, user]);

  useEffect(() => {
    setIsChanged(user.name !== values.name || user.email !== values.email);
  }, [values, user]);

  function handleSubmit(e) {
    e.preventDefault();
    setIsChanged(false);
    handleIsSave();
    updateInfoUser({
      name: values.name,
      email: values.email,
    });
  }

  return (
    <section className="profile">
      <h1 className="profile__title">{`Привет, ${user.name}!`}</h1>
      <form className="profile__form" onSubmit={handleSubmit}>
        <div className="profile__form-input-container">
          <label className="profile__form-input-title">Имя</label>
          <input
            type="text"
            className="profile__input"
            name="name"
            value={values.name || ""}
            onChange={handleChange}
            required
            placeholder="Name"
            minLength={2}
            maxLength={30}
            disabled={!isOneCange}
          />
          <span className="profile__from-input-error">{errors.name || ""}</span>
        </div>
        <div className="profile__form-input-container">
          <label className="profile__form-input-title">E-mail</label>
          <input
            type="email"
            className="profile__input"
            name="email"
            value={values.email || ""}
            pattern="^\S+@\S+\.\S+$"
            onChange={handleChange}
            required
            placeholder="E-mail"
            disabled={!isOneCange}
          />
          <span className="profile__from-input-error">
            {errors.email || ""}
          </span>
        </div>
        {isError.updateUser && (
          <span className="profile-form__submit-error">
            {isError.updateUser}
          </span>
        )}
        <div className="profile__buttons">
          {!isOneCange ? (
            <>
              <button
                className="profile__form-edit button"
                onClick={handleIsOneCange}
                type="button"
              >
                Редактировать
              </button>
              <Link
                to="/signin"
                onClick={handleLogOut}
                className="profile__logout button"
              >
                Выйти из аккаунта
              </Link>
            </>
          ) : (
            <div className="profile-form__submit-container">
              <button
                type="submit"
                className="profile-form__submit button"
                disabled={!(isChanged && isValid)}
              >
                Сохранить
              </button>
            </div>
          )}
        </div>
      </form>
    </section>
  );
}

export default Profile;
