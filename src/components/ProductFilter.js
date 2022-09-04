import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context";
import classNames from "classnames";
import MiniPageControl from "./MiniPageControl";
import PropTypes from "prop-types";
import { ArrowDownward, ArrowUpward, UnfoldMore } from "@mui/icons-material";
import { Box, useMediaQuery } from "@mui/material";

const ProductFilter = ({ isSearchPage, isProductPage }) => {
  let {
    filter,
    filterPrice,
    handleClick,
    categoryItems,
    searchItems,
    setFilter,
    setFilterPrice,
    setSearchItemFiltered,
  } = useContext(ProductContext);
  const [isFilterPriceShow, setIsFilterPriceShow] = useState(false);
  const [
    isFilterPriceDescForXsResponsive,
    setIsFilterPriceDescForXsResponsive,
  ] = useState(false);
  const xsBreakpointMatches = useMediaQuery("(max-width:600px)");
  const defaultFilterPrice = "default";
  const defaultFilter = "all";

  let totalItems = 0;
  if (isSearchPage) {
    totalItems = searchItems.length;
  } else {
    totalItems = categoryItems.length;
  }

  useEffect(() => {
    setFilter(defaultFilter);
    setFilterPrice(defaultFilterPrice);
    if (isProductPage && categoryItems.length === 0) {
      setFilterPrice(defaultFilterPrice);
    }
    if (isSearchPage && searchItems.length === 0) {
      setFilterPrice(defaultFilterPrice);
    }
  }, [
    categoryItems.length,
    isProductPage,
    isSearchPage,
    searchItems,
    searchItems.length,
    setFilter,
    setFilterPrice,
    setSearchItemFiltered,
  ]);

  const handleFilterPriceClickForXsResponsive = () => {
    if (!isFilterPriceDescForXsResponsive) {
      setFilterPrice("priceAsc");
      setIsFilterPriceDescForXsResponsive(true);
    }
    if (isFilterPriceDescForXsResponsive) {
      setFilterPrice("priceDesc");
      setIsFilterPriceDescForXsResponsive(false);
    }
  };

  return (
    <Box sx={{ top: isSearchPage && "8.5rem" }} className="app__filter">
      <div className="app__filter-label">Sắp xếp theo</div>
      <div className="app__filter-list">
        {/* <!-- active: btn--active --> */}
        <button
          data-name="filter"
          data-value="all"
          onClick={totalItems === 0 ? undefined : handleClick}
          className={classNames("btn app__filter-item app__filter-popular", {
            "btn--active": filter === "all",
          })}
          disabled={
            (isProductPage && categoryItems.length === 0) ||
            (isSearchPage && searchItems.length === 0)
          }
        >
          Tất cả
        </button>
        <button
          data-name="filter"
          data-value="date"
          onClick={totalItems === 0 ? undefined : handleClick}
          className={classNames("btn app__filter-item app__filter-newest", {
            "btn--active": filter === "date",
          })}
          disabled={
            (isProductPage && categoryItems.length === 0) ||
            (isSearchPage && searchItems.length === 0)
          }
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
          disabled={
            (isProductPage && categoryItems.length === 0) ||
            (isSearchPage && searchItems.length === 0)
          }
        >
          Bán chạy
        </button>
        <div
          data-name="filterPrice"
          onClick={() =>
            ((isProductPage && categoryItems.length !== 0) ||
              (isSearchPage && searchItems.length !== 0)) &&
            (xsBreakpointMatches
              ? handleFilterPriceClickForXsResponsive()
              : setIsFilterPriceShow(!isFilterPriceShow))
          }
          tabindex="0"
          onBlur={() =>
            setTimeout(() => {
              setIsFilterPriceShow(false);
            }, 200)
          }
          className={
            totalItems === 0 ? "select-input--disabled" : " select-input"
          }
        >
          <span
            className={classNames("app__input-lable", {
              "app__input-lable--active": filterPrice !== "default",
            })}
          >
            {!xsBreakpointMatches
              ? filterPrice === "priceAsc"
                ? "Giá: Thấp đến cao"
                : filterPrice === "priceDesc"
                ? "Giá: Cao đến thấp"
                : "Giá"
              : "Giá"}
          </span>
          {filterPrice === "default" && (
            <UnfoldMore
              sx={{ display: { sm: "none", xs: "inline" } }}
            ></UnfoldMore>
          )}
          {xsBreakpointMatches && filterPrice === "priceDesc" && (
            <ArrowDownward
              sx={{ color: "var(--primary-color)" }}
            ></ArrowDownward>
          )}
          {xsBreakpointMatches && filterPrice === "priceAsc" && (
            <ArrowUpward sx={{ color: "var(--primary-color)" }}></ArrowUpward>
          )}
          <i className="app__input-icon bi bi-chevron-down"></i>
          {isFilterPriceShow && (
            <ul className="app__input-list">
              {/* <!-- icon: <i className="app__input-item-icon bi bi-check"></i> --> */}
              {/* <!-- active: app__input-item--active  --> */}
              <li className="app__input-item app__price-default app__input-item--active">
                Giá<i className="app__input-item-icon bi bi-check"></i>
              </li>
              <li
                data-name="filterPrice"
                data-value="priceAsc"
                onClick={(e) => {
                  handleClick(e);
                  setTimeout(() => {
                    setIsFilterPriceShow(!isFilterPriceShow);
                  }, 200);
                }}
                className={classNames("app__input-item", "app__price-asc", {
                  "app__input-item--active": filterPrice === "priceAsc",
                })}
              >
                Giá: Thấp đến Cao
                <i
                  className={
                    filterPrice === "priceAsc"
                      ? "app__input-item-icon bi bi-check"
                      : undefined
                  }
                ></i>
              </li>
              <li
                data-name="filterPrice"
                data-value="priceDesc"
                onClick={(e) => {
                  handleClick(e);
                  setTimeout(() => {
                    setIsFilterPriceShow(!isFilterPriceShow);
                  }, 200);
                }}
                className={classNames("app__input-item", "app__price-desc", {
                  "app__input-item--active": filterPrice === "priceDesc",
                })}
              >
                Giá: Cao đến Thấp
                <i
                  className={
                    filterPrice === "priceDesc"
                      ? "app__input-item-icon bi bi-check"
                      : undefined
                  }
                ></i>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="app__filter-page">
        <MiniPageControl totalItems={totalItems}></MiniPageControl>
      </div>
    </Box>
  );
};

ProductFilter.propTypes = {
  isSearchPage: PropTypes.bool,
  isProductPage: PropTypes.bool,
};

ProductFilter.defaultProps = {
  isSearchPage: false,
  isProductPage: false,
};

export default ProductFilter;
