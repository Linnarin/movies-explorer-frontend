import React from "react";

function Burger(props) {
  return (
    <button
      className={`burger ${props.isBurgerOpen ? "burger_active" : ""} button`}
      onClick={props.handleOneClick}>
      <span></span>
    </button>
  );
}

export default Burger;
