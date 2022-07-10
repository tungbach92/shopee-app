import React from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";

export default function HeaderSearchHistory(props) {
  const history = useHistory();
  const { filterProductBySearch, text, setSearchInput, isSearchPage } = props;
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

HeaderSearchHistory.propTypes = {
  filterProductBySearch: PropTypes.func,
  text: PropTypes.string,
  setSearchInput: PropTypes.func,
  isSearchPage: PropTypes.bool,
};

HeaderSearchHistory.defaultProps = {
  filterProductBySearch: () => {},
  text: "",
  setSearchInput: () => {},
  isSearchPage: false,
};
