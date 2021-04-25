import React, { Component } from "react";
import { ProductContext } from "../context";
import PaginationItemNumber from "./PaginationItemNumber";

export default class Pagination extends Component {
  static contextType = ProductContext;
  render() {
    const {
      sortedItems,
      pageIndex,
      pageSize,
      pageTotal,
      handleClick,
    } = this.context;

    if (sortedItems.length <= pageSize) {
      return <ul className="pagination pagination--mtb3"></ul>;
    } else
      return (
        <ul className="pagination pagination--mtb3">
          <li className="pagination-item pagination-item__left">
            <div className="pagination-item__link">
              <i className="pagination-item__icon bi bi-chevron-left"></i>
            </div>
          </li>
          <li
            data-name="pageIndex"
            data-value="1"
            onClick={handleClick}
            className="pagination-number pagination-number--active"
          >
            <div className="pagination-item__link">1</div>
          </li>
          <li
            data-name="pageIndex"
            data-value="2"
            onClick={handleClick}
            className="pagination-number"
          >
            <div className="pagination-item__link">2</div>
          </li>
          {/* Hiện ... khi quá 5 trnag đầu */}
          {pageIndex >= 6 && (
            <li className="pagination-item pagination-item--non-click">
              <div className="pagination-item__link">...</div>
            </li>
          )}
          <PaginationItemNumber></PaginationItemNumber>
          {/* Hiện ... khi quá 5 trang cuối */}
          {pageTotal > 5 && pageIndex <= pageTotal - 3 && (
            <li className="pagination-item pagination-item--non-click">
              <div className="pageTotalpagination-item__link">...</div>
            </li>
          )}
          <li className="pagination-item pagination-item__right">
            <div className="pagination-item__link">
              <i className="pagination-item__icon bi bi-chevron-right"></i>
            </div>
          </li>
        </ul>
      );
  }
}
