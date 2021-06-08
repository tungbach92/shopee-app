import React, { useRef } from "react";
import shopeeLogo from "../img/shoppe-logo.png";
import HeaderCart from "./HeaderCart";
import HeaderSearchHistory from "./HeaderSearchHistory";
import { Link, useHistory } from "react-router-dom";
import classNames from "classnames";

const HeaderSearch = React.memo(function (props) {
  console.log("header search render");
  const {
    filterProductBySearch,
    addToSearchHistory,
    searchHistory,
    isCartPageLoaded,
    isCheckoutPage,
  } = props;
  const inputEl = useRef("");
  const history = useHistory();
  function getUnique(items) {
    let uniqueItems = new Set(items);
    return [...uniqueItems];
  }

  function handleSearchIconClick() {
    let text = inputEl.current.value;
    filterProductBySearch(text);
    addToSearchHistory(text);
    history.push("/");
  }

  function inputOnKeyUp(event) {
    let text = event.target.value;
    if (event.keyCode === 13) {
      inputEl.current.blur();
      filterProductBySearch(text);
      addToSearchHistory(text);
      history.push("/");
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
                <li className="header__search-item">
                  <a href="# " className="header__item-link">
                    Hoodie Nam
                  </a>
                </li>
                <li className="header__search-item">
                  <a href="# " className="header__item-link">
                    Sandal Nữ
                  </a>
                </li>
                <li className="header__search-item">
                  <a href="# " className="header__item-link">
                    Áo Nữ
                  </a>
                </li>
                <li className="header__search-item">
                  <a href="# " className="header__item-link">
                    Quần Nam
                  </a>
                </li>
                <li className="header__search-item">
                  <a href="# " className="header__item-link">
                    Dép Nam
                  </a>
                </li>
                <li className="header__search-item">
                  <a href="# " className="header__item-link">
                    Balo Nữ
                  </a>
                </li>
                <li className="header__search-item">
                  <a href="# " className="header__item-link">
                    Váy Trắng
                  </a>
                </li>
                <li className="header__search-item">
                  <a href="# " className="header__item-link">
                    Tất Nữ
                  </a>
                </li>
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
