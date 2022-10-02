import classNames from "classnames";
import React, { useEffect, useState } from "react";
import shopeeLogo from "../../img/shoppe-logo.png";
import HeaderCart from "./HeaderCart";
import { Close } from "@mui/icons-material";
import { useProductsAndSearch } from "../../context/ProductsAndSearchProvider";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import getSearchHistoryFromFirebase from "../../services/getSearchHistoryFromFirebase";
import { useUser } from "../../context/UserProvider";
import { Box, Stack } from "@mui/material";
import PropTypes from "prop-types";
import { db } from "../../firebase";

const HeaderSearch = ({
  isCartPage,
  isSearchPage,
  isProductPage,
  isCheckoutPage,
  xsBreakpointMatches,
}) => {
  const { searchInput, setSearchInput, handleSearchInputChange } =
    useProductsAndSearch();
  const { user } = useUser();

  const wrapperRef = useRef();
  const navigate = useNavigate();
  const [searchHistory, setSearchHistory] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isHistory, setIsHistory] = useState(false);

  const changeSuggestionsByInputText = (text) => {
    const mathSuggestions = searchHistory.filter((item) => {
      return item.trim().toLowerCase().includes(text.trim().toLowerCase());
    });
    if (text === "") {
      setSuggestions(searchHistory);
    } else {
      setSuggestions(mathSuggestions);
    }
  };

  const handleInputClick = (e) => {
    const text = e.target.value;
    if (!xsBreakpointMatches) {
      setIsHistory(!isHistory);
    }
    changeSuggestionsByInputText(text);
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    setSearchInput(text);
    changeSuggestionsByInputText(text);
  };

  const addToSearchHistory = (text) => {
    text = text.trim();
    if (text.length > 0) {
      const newSearchHistory = [...searchHistory, text];
      const uniqueNewSearchHistory = [...new Set(newSearchHistory)];
      saveSearchHistoryToFirebase(user, uniqueNewSearchHistory);
      setSearchHistory(uniqueNewSearchHistory);
    }
  };
  const deleteFromSearchHistory = (text) => {
    text = text.trim();
    if (text.length > 0) {
      const newSearchHistory = [...searchHistory].filter(
        (item) => item !== text
      );
      setSearchHistory(newSearchHistory);
    }
  };

  const saveSearchHistoryToFirebase = async (user, searchHistory) => {
    if (!user) return;
    try {
      await db
        .collection("users")
        .doc(user?.uid)
        .collection("searchHistory")
        .doc("searchHistoryItems")
        .set({
          basket: searchHistory,
        });
    } catch (error) {
      alert(error);
    }
  };

  const deleteFromSuggestions = (text) => {
    const mathSuggestions = [...suggestions].filter((item) => item !== text);
    setSuggestions(mathSuggestions);
  };

  const handleSearchIconClick = async (text) => {
    addToSearchHistory(text);

    setSearchInput(text);
    handleSearchInputChange(text);
    setIsHistory(false);
    navigate("/search"); // navigate to search 1 time
  };

  const handleHistoryDelete = (item) => {
    deleteFromSearchHistory(item);
    deleteFromSuggestions(item);
  };

  const inputOnKeyUp = (event) => {
    const enter = 13;
    if (event.keyCode === enter) {
      event.currentTarget.blur();
      handleSearchIconClick(event.target.value);
    }
  };

  useEffect(() => {
    (async () => {
      if (user) {
        const searchHistory = await getSearchHistoryFromFirebase(user);
        setSearchHistory(searchHistory);
      }
    })();
  }, [setSearchHistory, user]);

  useEffect(() => {
    if (xsBreakpointMatches) {
      setIsHistory(false);
    }
  }, [xsBreakpointMatches]);

  const onMouseDown = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setIsHistory(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  return (
    <div
      className={classNames("header__search", {
        "header__search--cart":
          (isCartPage && !xsBreakpointMatches) ||
          (isCheckoutPage && !xsBreakpointMatches),
      })}
    >
      <div className="header__logo-wrapper">
        <a
          href="/"
          className={classNames("header__logo-link", {
            "header__logo-link--notHome": isCartPage || isCheckoutPage,
          })}
        >
          <img src={shopeeLogo} alt="shoppe-logo" />
        </a>
        {isCartPage && <div className="header__page-name">Giỏ hàng</div>}
        {isCheckoutPage && <div className="header__page-name">Thanh Toán</div>}
      </div>

      {!isCheckoutPage && (
        <>
          <div
            ref={wrapperRef}
            className={classNames("header__search-content", {
              "header__search-content--cart":
                isCartPage && !xsBreakpointMatches,
            })}
          >
            <div className="header__search-wrapper">
              <input
                type="text"
                onChange={handleInputChange}
                onClick={handleInputClick}
                // onBlur={handleSearchBlur}
                onKeyUp={inputOnKeyUp}
                className="header__search-input"
                placeholder="Tìm sản phẩm, thương hiệu, và tên shop"
                value={searchInput}
              />
              <div
                onClick={() => handleSearchIconClick(searchInput)}
                className="header__search-icon"
              >
                <i className="bi bi-search"></i>
              </div>
              {isHistory && (
                <ul className="header__history-list">
                  <li className="header__history-title">Lịch Sử Tìm Kiếm</li>
                  {suggestions.map((item, index) => (
                    <Stack
                      sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        "&:hover": {
                          backgroundColor: "var(--lighter-grey-color)",
                        },
                      }}
                      key={index}
                    >
                      <li
                        onClick={() => handleSearchIconClick(item)}
                        className="header__history-item"
                      >
                        <a href="# " className="header__history-link">
                          {item}
                        </a>
                      </li>
                      <Box
                        sx={{
                          height: "100%",
                          marginRight: "0.6rem",
                          "& :hover": { color: "var(--primary-color)" },
                          cursor: "pointer",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Close
                          onClick={() => handleHistoryDelete(item)}
                        ></Close>
                      </Box>
                    </Stack>
                  ))}
                </ul>
              )}
            </div>

            <ul className="header__search-list">
              {/* list of recommends */}
              {[].map((item) => (
                <li className="header__search-item">
                  <a href="# " className="header__item-link">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {!isCartPage && (
            <HeaderCart
              isProductPage={isProductPage}
              isSearchPage={isSearchPage}
            ></HeaderCart>
          )}
        </>
      )}
    </div>
  );
};
HeaderSearch.propTypes = {
  isProductPage: PropTypes.bool,
  isCartPage: PropTypes.bool,
  isCheckoutPage: PropTypes.bool,
  isSearchPage: PropTypes.bool,
  xsBreakpointMatches: PropTypes.bool.isRequired,
};
HeaderSearch.defaultProps = {
  isProductPage: false,
  isCartPage: false,
  isCheckoutPage: false,
  isSearchPage: false,
};

export default HeaderSearch;
