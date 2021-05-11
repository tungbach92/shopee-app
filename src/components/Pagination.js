import React, { Component } from "react";
import { ProductContext } from "../context";
import PaginationItemNumber from "./PaginationItemNumber";
import classNames from "classnames";
export default class Pagination extends Component {
  static contextType = ProductContext;
  render() {
    let {
      sortedItems,
      pageIndex,
      pageTotal,
      similarPageIndex,
      similarPageTotal,
      pageSize,
      similarPageSize,
      handleClick,
    } = this.context;
    if (this.props.similarDisPlay) {
      pageIndex = similarPageIndex;
      pageTotal = similarPageTotal;
      pageSize = similarPageSize;
    }
    if (sortedItems.length <= pageSize) {
      return <ul className="pagination pagination--mtb3"></ul>;
    } else
      return (
        <ul className="pagination pagination--mtb3">
          <li
            data-name="pageIndexLeftIcon"
            onClick={handleClick}
            className={classNames("pagination-item", " pagination-item__left", {
              "pagination-item--disabled": pageIndex <= 1,
            })}
          >
            <div className="pagination-item__link">
              <i className="pagination-item__icon bi bi-chevron-left"></i>
            </div>
          </li>
          <PaginationItemNumber
            similarDisPlay={this.props.similarDisPlay}
          ></PaginationItemNumber>
          <li
            data-name="pageIndexRightIcon"
            onClick={handleClick}
            className={classNames(
              "pagination-item",
              " pagination-item__right",
              {
                "pagination-item--disabled": pageIndex >= pageTotal,
              }
            )}
          >
            <div className="pagination-item__link">
              <i className="pagination-item__icon bi bi-chevron-right"></i>
            </div>
          </li>
        </ul>
      );
  }
}
