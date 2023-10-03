import React from "react";

function Tumblr({ onChangeShort, shortStatus }) {
  return (
    <div className="tumblr">
      <label className="tumblr__switch button">
        <input
          type="checkbox"
          className="tumblr__input"
          checked={shortStatus}
          onChange={() => onChangeShort(!shortStatus)}
        />
        <span className="tumblr__slider"></span>
      </label>
      <p className="tumblr__description">Короткометражки</p>
    </div>
  );
}

export default Tumblr;
