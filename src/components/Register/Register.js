import React from "react";
import PageWithForm from "../PageWithForm/PageWithForm";

function Register({register}) {
  return (
    <PageWithForm
      name="register"
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      authDescription="Уже зарегистрированы?"
      authButtonText="Войти"
      authButtonLink="/signin"
      pageType="register"
      onSubmit={register}
    ></PageWithForm>
  );
}

export default Register;
