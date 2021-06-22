import React, { useRef, useState, useContext, useEffect } from "react";
import shopeeLogo from "../img/shoppe-logo.png";
import HeaderCart from "./HeaderCart";
import HeaderSearchHistory from "./HeaderSearchHistory";
import { Link, useHistory } from "react-router-dom";
import classNames from "classnames";
import {ProductContext } from "../context";

const HeaderSearch = React.memo(function (props) {
  console.log("header search render");
  const {
    filterProductBySearch,
    addToSearchHistory,
    searchHistory,
    isCartPageLoaded,
    isCheckoutPage,
  } = props;
  const context= useContext(ProductContext);
  const {orderItems} = context;
  const inputEl = useRef("");
  const history = useHistory();
  const [recommendSearch, setRecommendSearch] = useState([]);
  function getUnique(items) {
    let uniqueItems = new Set(items);
    return [...uniqueItems];
  }

  useEffect(() => {
    function createRecommendedSearch () { 
      let orderedCheckoutItems = [];
      orderItems.forEach((orderItem) => {
        console.log(orderItem.checkoutItems);
        orderedCheckoutItems = [
          ...orderedCheckoutItems,
          ...orderItem.checkoutItems,
        ];
      });
  
      let allTags = [];
      orderedCheckoutItems.forEach(item => {
        // allTags = [...allTags,...item.tags] //TODO: add tag to item and enable this
      })
      allTags = getUnique(allTags);
      setRecommendSearch(allTags);
    }
    createRecommendedSearch();
  },[orderItems])

  function handleSearchIconClick() {
    let text = inputEl.current.value;
    filterProductBySearch(text);
    addToSearchHistory(text);
    history.push("/"); // return to path "/"
    console.log(history);
  }

  function inputOnKeyUp(event) {
    let text = event.target.value;
    if (event.keyCode === 13) {
      inputEl.current.blur();
      filterProductBySearch(text);
      addToSearchHistory(text);
      history.push("/");
      console.log(history);
    }
  }

  return (
    <div
      className={classNames("header__search", {
        "header__search--cart": isCartPageLoaded || isCheckoutPage,
      })}
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
                  onKeyUp={inputOnKeyUp}
                  className="header__search-input"
                  placeholder="Tìm sản phẩm, thương hiệu, và tên shop"
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
                      handleSearchIconClick={handleSearchIconClick}
                    ></HeaderSearchHistory>
                  ))}
                </ul>
              </div>

              <ul className="header__search-list">
                {recommendSearch.map(item =>
                <li className="header__search-item">
                  <a href="# " className="header__item-link">
                    {item}
                  </a>
                </li>)}
              </ul>
            </div>
            <HeaderCart></HeaderCart>
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
                onKeyUp={inputOnKeyUp}
                className="header__search-input"
                placeholder="Tìm sản phẩm, thương hiệu, và tên shop"
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
                    handleSearchIconClick={handleSearchIconClick}
                  ></HeaderSearchHistory>
                ))}
              </ul>
            </div>
          </div>
        )
      ) : null}
    </div>
  );
});
export default HeaderSearch;
