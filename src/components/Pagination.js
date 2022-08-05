import React, { useContext, useEffect } from "react";
import { ProductContext } from "../context";
import PaginationItemNumber from "./PaginationItemNumber";
import classNames from "classnames";
import PropTypes from "prop-types";

const Pagination = ({
  isProductPage,
  isSearchPage,
  similarDisPlay,
  isOrderPage,
  searchOrderItemsFiltered,
}) => {
  let {
    categoryItemsFiltered,
    pageIndex,
    setPageIndex,
    pageTotal,
    pageSize,
    searchItemFiltered,
    similarItems,
  } = useContext(ProductContext);

  if (
    (isProductPage && categoryItemsFiltered.length <= pageSize) ||
    (isSearchPage && searchItemFiltered.length <= pageSize) ||
    (isOrderPage && searchOrderItemsFiltered.length <= pageSize) ||
    (similarDisPlay && similarItems.length <= pageSize)
  ) {
    return null;
  } else
    return (
      <ul className="pagination pagination--mtb3">
        <li
          onClick={
            pageIndex <= 1 ? undefined : () => setPageIndex(pageIndex - 1)
          }
          className={classNames("pagination-item", " pagination-item__left", {
            "pagination-item--disabled": pageIndex <= 1,
          })}
        >
          <div className="pagination-item__link">
            <i className="pagination-item__icon bi bi-chevron-left"></i>
          </div>
        </li>
        <PaginationItemNumber></PaginationItemNumber>
        <li
          onClick={
            pageIndex >= pageTotal
              ? undefined
              : () => setPageIndex(pageIndex + 1)
          }
          className={classNames("pagination-item", " pagination-item__right", {
            "pagination-item--disabled": pageIndex >= pageTotal,
          })}
        >
          <div className="pagination-item__link">
            <i className="pagination-item__icon bi bi-chevron-right"></i>
          </div>
        </li>
      </ul>
    );
};

Pagination.propTypes = {
  isProductPage: PropTypes.bool,
  isSearchPage: PropTypes.bool,
  similarDisPlay: PropTypes.bool,
  isOrderPage: PropTypes.bool,
  searchOrderItemsFiltered: PropTypes.arrayOf(PropTypes.object),
};

Pagination.defaultProps = {
  isProductPage: false,
  isSearchPage: false,
  similarDisPlay: false,
  isOrderPage: false,
  searchOrderItemsFiltered: [],
};

export default Pagination;
