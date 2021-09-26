import React, { Component } from "react";
import { ProductContext } from "../context";
import classNames from "classnames";
import MiniPageControl from "./MiniPageControl";
export default class ProductFilter extends Component {
  static contextType = ProductContext;

  handelHover = (event) => {
    event.currentTarget.children[2].removeAttribute("style");
  };

  render() {
    let { sortedItems, filter, filterPrice, handleClick, sortedSearchItems } =
      this.context;
    const { isSearchPage } = this.props;

    let totalItems = 0;
    if (isSearchPage) {
      totalItems = sortedSearchItems.length;
    } else {
      totalItems = sortedItems.length;
    }

    return (
      <div className="app__filter">
        <div className="app__filter-label">Sắp xếp theo</div>
        <div className="app__filter-list">
          {/* <!-- active: btn--active --> */}
          <button
            data-name="filter"
            data-value="popular"
            onClick={totalItems === 0 ? undefined : handleClick}
            className={classNames("btn app__filter-item app__filter-popular", {
              "btn--active": filter === "popular",
            })}
          >
            Phổ biến
          </button>
          <button
            data-name="filter"
            data-value="date"
            onClick={totalItems === 0 ? undefined : handleClick}
            className={classNames("btn app__filter-item app__filter-newest", {
              "btn--active": filter === "date",
            })}
          >
            Mới nhất
          </button>
          <button
            data-name="filter"
            data-value="bestSelling"
            onClick={totalItems === 0 ? undefined : handleClick}
            className={classNames("btn app__filter-item app__filter-bestSell", {
              "btn--active": filter === "bestSelling",
            })}
          >
            Bán chạy
          </button>
          <div
            data-name="filterPrice"
            onMouseEnter={this.handelHover}
            className={totalItems === 0 ? "select-input--disabled" : "select-input"}
          >
            <span
              className={classNames("app__input-lable", {
                "app__input-lable--active": filterPrice !== "default",
              })}
            >
              {filterPrice === "priceAsc"
                ? "Giá: Thấp đến cao"
                : filterPrice === "priceDesc"
                ? "Giá: Cao đến thấp"
                : "Giá"}
            </span>
            <i className="app__input-icon bi bi-chevron-down"></i>
            <ul className="app__input-list">
              {/* <!-- icon: <i className="app__input-item-icon bi bi-check"></i> --> */}
              {/* <!-- active: app__input-item--active  --> */}
              <li className="app__input-item app__price-default app__input-item--active">
                Giá<i className="app__input-item-icon bi bi-check"></i>
              </li>
              <li
                data-name="filterPrice"
                data-value="priceAsc"
                onClick={handleClick}
                className={classNames("app__input-item", "app__price-asc", {
                  "app__input-item--active": filterPrice === "priceAsc",
                })}
              >
                Giá: Thấp đến Cao
                <i
                  className={
                    filterPrice === "priceAsc" &&
                    "app__input-item-icon bi bi-check"
                  }
                ></i>
              </li>
              <li
                data-name="filterPrice"
                data-value="priceDesc"
                onClick={handleClick}
                className={classNames("app__input-item", "app__price-desc", {
                  "app__input-item--active": filterPrice === "priceDesc",
                })}
              >
                Giá: Cao đến Thấp
                <i
                  className={
                    filterPrice === "priceDesc" &&
                    "app__input-item-icon bi bi-check"
                  }
                ></i>
              </li>
            </ul>
          </div>
        </div>
        <div className="app__filter-page">
          <MiniPageControl totalItems={totalItems}></MiniPageControl>
        </div>
      </div>
    );
  }
}
