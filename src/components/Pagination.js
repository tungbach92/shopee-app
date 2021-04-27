import React, { Component } from "react";
import { ProductContext } from "../context";
import PaginationItemNumber from "./PaginationItemNumber";

export default class Pagination extends Component {
  static contextType = ProductContext;
  render() {
    const {
      sortedItems,
      pageSize,
      handleClick,
      eventValue,
    } = this.context;

    if (sortedItems.length <= pageSize) {
      return <ul className="pagination pagination--mtb3"></ul>;
    } else
      return (
        <ul className="pagination pagination--mtb3">
          <li
            data-name="pageIndexLeftIcon"
            onClick={handleClick}
            className="pagination-item pagination-item__left"
          >
            <div className="pagination-item__link">
              <i className="pagination-item__icon bi bi-chevron-left"></i>
            </div>
          </li>
          <PaginationItemNumber value={eventValue}></PaginationItemNumber>
          <li
            data-name="pageIndexRightIcon"
            onClick={handleClick}
            className="pagination-item pagination-item__right"
          >
            <div className="pagination-item__link">
              <i className="pagination-item__icon bi bi-chevron-right"></i>
            </div>
          </li>
        </ul>
      );
  }
}
