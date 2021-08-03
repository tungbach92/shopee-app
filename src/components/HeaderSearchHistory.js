import React from "react";
import { useHistory } from "react-router";
export default function HeaderSearchHistory(props) {
  const history = useHistory();
  const { inputEl, filterProductBySearch, text, setSearchInput, isSearchPage } =
    props;
  function handelClick() {
    filterProductBySearch(text);
    setSearchInput(text);
    if (!isSearchPage) {
      history.push("/search");
    }
  }
  return (
    <li onClick={handelClick} className="header__history-item">
      <a href="# " className="header__history-link">
        {text}
      </a>
    </li>
  );
}
