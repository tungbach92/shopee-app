import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function HeaderSearchHistory(props) {
  const navigate = useNavigate();
  const { filterItemsBySearch, text, setSearchInput, isSearchPage } = props;
  function handelClick() {
    filterItemsBySearch(text);
    setSearchInput(text);
    if (!isSearchPage) {
      navigate("/search");
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
  filterItemsBySearch: PropTypes.func,
  text: PropTypes.string,
  setSearchInput: PropTypes.func,
  isSearchPage: PropTypes.bool,
};

HeaderSearchHistory.defaultProps = {
  filterItemsBySearch: () => {},
  text: "",
  setSearchInput: () => {},
  isSearchPage: false,
};
