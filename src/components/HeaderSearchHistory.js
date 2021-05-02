import React from "react";

export default function HeaderSearchHistory(props) {
  const { inputEl, handleSearchIconClick, text } = props;
  function handelClick(event) {
    inputEl.current.value = text;
    handleSearchIconClick(text);
  }
  return (
    <li onClick={handelClick} className="header__history-item">
      <a href="# " className="header__history-link">
        {text}
      </a>
    </li>
  );
}
