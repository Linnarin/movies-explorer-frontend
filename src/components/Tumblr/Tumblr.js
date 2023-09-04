import React from "react";

function Tumblr() {
  return (
    <div className="tumblr">
      <label className="tumblr__switch button">
        <input type="checkbox" className="tumblr__input" />
        <span className="tumblr__slider"></span>
      </label>
      <p className="tumblr__description">Короткометражки</p>
    </div>
  );
}

export default Tumblr;
