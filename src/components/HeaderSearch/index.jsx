import React, { useRef, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import shopeeLogo from "../../img/shoppe-logo.png";
import HeaderCart from "../HeaderCart";
import HeaderSearchHistory from "../HeaderSearchHistory";
import { Link, useHistory } from "react-router-dom";
import classNames from "classnames";
import { ProductContext } from "../../context";

const HeaderSearch = ({
  isProductPage,
  isCartPageLoaded,
  isCheckoutPage,
  isSearchPage,
  style,
}) => {
  console.log("header search render");
  const {
    orderItems,
    filterProductBySearch,
    addToSearchHistory,
    searchHistory,
    searchInputOnChange,
    searchInput,
    setSearchInput,
  } = useContext(ProductContext);
  const inputEl = useRef("");
  const history = useHistory();
  const [recommendSearch, setRecommendSearch] = useState([]);
  function getUnique(items) {
    let uniqueItems = new Set(items);
    return [...uniqueItems];
  }

  useEffect(() => {
    if (orderItems) {
      function createRecommendedSearch() {
        let orderedCheckoutItems = [];
        orderItems.forEach((orderItem) => {
          // console.log(orderItem.checkoutItems);
          orderedCheckoutItems = [
            ...orderedCheckoutItems,
            ...orderItem.data.basket,
          ];
        });
        let allTags = [];
        orderedCheckoutItems.forEach((item) => {
          // allTags = [...allTags,...item.tags] //TODO: add tag to item and enable this
        });
        allTags = getUnique(allTags);
        setRecommendSearch(allTags);
      }
      createRecommendedSearch();
    }
  }, [orderItems]);

  function handleSearchIconClick() {
    // let text = inputEl.current.value;
    filterProductBySearch(searchInput);
    addToSearchHistory(searchInput);
    history.push("/search");
    console.log(history);
  }

  function inputOnKeyUp(event) {
    if (event.keyCode === 13) {
      event.currentTarget.blur();
      filterProductBySearch(searchInput);
      addToSearchHistory(searchInput);
      history.push("/search");
      console.log(history);
    }
  }
  useEffect(() => {
    if (isSearchPage) {
      inputEl.current.value = searchInput;
    }
  }, [isSearchPage, searchInput]);

  return ( // header__search header__search--cart
    <div
      className={style}
    >
      <div className="header__logo-wrapper">
        <a
          href="/"
          className={classNames("header__logo-link", {
            "header__logo-link--notHome": isCartPageLoaded || isCheckoutPage,
          })}
        >
          <img src={shopeeLogo} alt="shoppe-logo" />
        </a>
        {isCartPageLoaded && <div className="header__page-name">Giỏ hàng</div>}
        {isCheckoutPage && <div className="header__page-name">Thanh Toán</div>}
      </div>

      {!isCheckoutPage ? (
        !isCartPageLoaded ? (
          <>
            <div className="header__search-content">
              <div className="header__search-wrapper">
                <input
                  ref={inputEl}
                  type="text"
                  onChange={searchInputOnChange}
                  onKeyUp={inputOnKeyUp}
                  className="header__search-input"
                  placeholder="Tìm sản phẩm, thương hiệu, và tên shop"
                  // value={searchInput}
                />
                <a
                  href="# "
                  onClick={handleSearchIconClick}
                  className="header__search-icon"
                >
                  <i className="bi bi-search"></i>
                </a>
                <ul className="header__history-list">
                  <li className="header__history-title">Lịch Sử Tìm Kiếm</li>
                  {getUnique(searchHistory).map((item, index) => (
                    <HeaderSearchHistory
                      inputEl={inputEl}
                      key={index}
                      text={item}
                      filterProductBySearch={filterProductBySearch}
                      setSearchInput={setSearchInput}
                      isSearchPage={isSearchPage}
                    ></HeaderSearchHistory>
                  ))}
                </ul>
              </div>

              <ul className="header__search-list">
                {recommendSearch.map((item) => (
                  <li className="header__search-item">
                    <a href="# " className="header__item-link">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <HeaderCart
              isProductPage={isProductPage}
              isSearchPage={isSearchPage}
            ></HeaderCart>
          </>
        ) : (
          <div
            className={classNames("header__search-content", {
              "header__search-content--cart": isCartPageLoaded,
            })}
          >
            <div className="header__search-wrapper">
              <input
                ref={inputEl}
                type="text"
                onChange={searchInputOnChange}
                onKeyUp={inputOnKeyUp}
                className="header__search-input"
                placeholder="Tìm sản phẩm, thương hiệu, và tên shop"
                // value={searchInput}
              />
              <a
                href="# "
                onClick={handleSearchIconClick}
                className="header__search-icon"
              >
                <i className="bi bi-search"></i>
              </a>
              <ul className="header__history-list">
                <li className="header__history-title">Lịch Sử Tìm Kiếm</li>
                {getUnique(searchHistory).map((item, index) => (
                  <HeaderSearchHistory
                    key={index}
                    text={item}
                    inputEl={inputEl}
                    filterProductBySearch={filterProductBySearch}
                    setSearchInput={setSearchInput}
                    isSearchPage={isSearchPage}
                  ></HeaderSearchHistory>
                ))}
              </ul>
            </div>
          </div>
        )
      ) : null}
    </div>
  );
};

HeaderSearch.propTypes = {
  isProductPage: PropTypes.bool,
  isCartPageLoaded: PropTypes.bool,
  isCheckoutPage: PropTypes.bool,
  isSearchPage: PropTypes.bool,
  style: PropTypes.string,
};
HeaderSearch.defaultProps = {
  isProductPage: false,
  isCartPageLoaded: false,
  isCheckoutPage: false,
  isSearchPage: false,
  style: 'header__search',
};

export default HeaderSearch;
