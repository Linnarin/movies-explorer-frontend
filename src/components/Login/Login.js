import React from "react";
import PageWithForm from "../PageWithForm/PageWithForm";


function Login({login}) {

  return (
    <PageWithForm
      name="login"
      title="Рады видеть!"
      buttonText="Войти"
      authDescription="Ещё не зарегистрированы?"
      authButtonText="Регистрация"
      authButtonLink="/signup"
      pageType="login"
      onSubmit={login}
    ></PageWithForm>
  );
}

export default Login;
