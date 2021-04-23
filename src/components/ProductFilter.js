import React, { Component } from "react";
import { ProductContext } from "../context";
import classNames from "classnames";

export default class ProductFilter extends Component {
  static contextType = ProductContext;

  handelHover = (event) => {
    const name = event.currentTarget.dataset.name;
    if (name === "filterPrice") {
      event.currentTarget.children[2].removeAttribute("style");
    }
  };

  render() {
    const {
      filter,
      filterPrice,
      isFilterPriceClick,
      isFilterClick,
      handleClick,
    } = this.context;

    let labelValue = "";
    var icon1,
      icon2 = "";
    var isFilterPopular,
      isFilterDate,
      isFilterBestSell = false;

    //css filter price
    if (filterPrice === "priceAsc" && isFilterPriceClick) {
      labelValue = "Giá: Thấp đến cao";
      icon1 = `app__input-item-icon bi bi-check`;
    } else if (filterPrice === "priceDesc" && isFilterPriceClick) {
      labelValue = "Giá: Cao đến thấp";
      icon2 = `app__input-item-icon bi bi-check`;
    } else {
      labelValue = "Giá:";
    }
    //css filter popular, date, bestSelling
    if (filter === "popular") {
      isFilterPopular = true;
    } else if (filter === "date") {
      isFilterDate = true;
    } else if (filter === "bestSelling") {
      isFilterBestSell = true;
    }

    return (
      <div className="app__filter">
        <div className="app__filter-label">Sắp xếp theo</div>
        <div className="app__filter-list">
          {/* <!-- active: btn--active --> */}
          <button
            data-name="filter"
            data-value="popular"
            onClick={handleClick}
            className={classNames("btn app__filter-item app__filter-popular", {
              "btn--active": isFilterPopular === true,
            })}
          >
            Phổ biến
          </button>
          <button
            data-name="filter"
            data-value="date"
            onClick={handleClick}
            className={classNames("btn app__filter-item app__filter-newest", {
              "btn--active": isFilterDate === true,
            })}
          >
            Mới nhất
          </button>
          <button
            data-name="filter"
            data-value="bestSelling"
            onClick={handleClick}
            className={classNames("btn app__filter-item app__filter-bestSell", {
              "btn--active": isFilterBestSell === true,
            })}
          >
            Bán chạy
          </button>
          <div
            data-name="filterPrice"
            onMouseEnter={this.handelHover}
            className="select-input"
          >
            <span
              className={classNames("app__input-lable", {
                "app__input-lable--active": filterPrice !== "default",
              })}
            >
              {labelValue}
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
                className="app__input-item app__price-asc"
              >
                Giá: Thấp đến Cao
                <i className={icon1}></i>
              </li>
              <li
                data-name="filterPrice"
                data-value="priceDesc"
                onClick={handleClick}
                className="app__input-item app__price-desc"
              >
                Giá: Cao đến Thấp
                <i className={icon2}></i>
              </li>
            </ul>
          </div>
        </div>
        <div className="app__filter-page">
          <div className="app__page-number">
            {/* <!-- render --> */}
            {/* <!--  app__pre-page--disabled --> */}
          </div>
          <div className="app__filter-page-item app__pre-page app__pre-page--disabled">
            <i className="app__pre-icon bi bi-chevron-left"></i>
          </div>
          <div className="app__filter-page-item app__next-page">
            <i className="app__next-icon bi bi-chevron-right"></i>
          </div>
        </div>
      </div>
    );
  }
}
