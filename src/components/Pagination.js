import React, { useContext, useEffect } from "react";
import { ProductContext } from "../context";
import PaginationItemNumber from "./PaginationItemNumber";
import classNames from "classnames";

const Pagination = ({ isSearchPage, similarDisPlay }) => {
  let {
    sortedItems,
    pageIndex,
    pageTotal,
    similarPageIndex,
    similarPageTotal,
    pageSize,
    similarPageSize,
    handleClick,
    calcPageTotals,
    searchItems,
    setPageTotal,
    sortedSearchItems,
  } = useContext(ProductContext);
  if (similarDisPlay) {
    pageIndex = similarPageIndex;
    pageTotal = similarPageTotal;
    pageSize = similarPageSize;
  }
  useEffect(() => {
    if (isSearchPage) {
      const pageTotal = calcPageTotals(sortedSearchItems);
      setPageTotal(pageTotal);
    }
  }, [calcPageTotals, isSearchPage, setPageTotal, sortedSearchItems]);

  if (
    sortedItems.length <= pageSize ||
    (isSearchPage && searchItems.length <= pageSize)
  ) {
    return null;
  } else
    return (
      <ul className="pagination pagination--mtb3">
        <li
          data-name={
            similarDisPlay ? "similarPageIndexLeftIcon" : "pageIndexLeftIcon"
          }
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
          isSearchPage={isSearchPage}
          similarDisPlay={similarDisPlay}
        ></PaginationItemNumber>
        <li
          data-name={
            similarDisPlay ? "similarPageIndexRightIcon" : "pageIndexRightIcon"
          }
          onClick={handleClick}
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

export default Pagination;
