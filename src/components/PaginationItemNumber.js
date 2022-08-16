import React, { useEffect } from "react";
import { ProductContext } from "../context";
import classNames from "classnames";
import { useContext } from "react";

export default function PaginationItemNumber() {
  const context = useContext(ProductContext);
  let { pageIndex, setPageIndex, pageTotal } = context;
  const numOfPageShowing = 5;
  const numberOfPageHiddingFromStart = 3;
  const numberOfPageHiddingFromEnd = 3;
  let arrayOfPageIndex = [];
  for (let index = numberOfPageHiddingFromStart; index <= pageTotal; index++) {
    //show pages from index to ...
    if (pageIndex <= numOfPageShowing && index <= numOfPageShowing) {
      arrayOfPageIndex.push(
        <li
          key={index}
          onClick={() => setPageIndex(index)}
          className={classNames("pagination-number", {
            "pagination-number--active": pageIndex === index,
          })}
        >
          <div className="pagination-item__link">{index}</div>
        </li>
      );
    }

    //show pages between ... and ...
    else if (
      pageIndex >= numOfPageShowing &&
      index < pageIndex + numberOfPageHiddingFromEnd &&
      index > pageIndex - numberOfPageHiddingFromStart
    ) {
      arrayOfPageIndex.push(
        <li
          key={index}
          onClick={() => setPageIndex(index)}
          className={classNames("pagination-number", {
            "pagination-number--active": pageIndex === index,
          })}
        >
          <div className="pagination-item__link">{index}</div>
        </li>
      );
    }

    //show pages from ... to the end
    else if (
      pageIndex > pageTotal - numberOfPageHiddingFromEnd &&
      index > pageTotal - numOfPageShowing
    ) {
      arrayOfPageIndex.push(
        <li
          key={index}
          onClick={() => setPageIndex(index)}
          className={classNames("pagination-number", {
            "pagination-number--active": pageIndex === index,
          })}
        >
          <div className="pagination-item__link">{index}</div>
        </li>
      );
    }
  }

  return (
    <>
      <li
        onClick={() => setPageIndex(1)}
        className={classNames("pagination-number", {
          "pagination-number--active": pageIndex === 1,
        })}
      >
        <div className="pagination-item__link">1</div>
      </li>
      <li
        onClick={() => setPageIndex(2)}
        className={classNames("pagination-number", {
          "pagination-number--active": pageIndex === 2,
        })}
      >
        <div className="pagination-item__link">2</div>
      </li>
      {/* Show ... when pageIndex > numOfPageShowing   */}
      {pageIndex > numOfPageShowing && (
        <li className="pagination-item pagination-item--non-click">
          <div className="pagination-item__link">...</div>
        </li>
      )}
      {arrayOfPageIndex}
      {/* show ... */}
      {pageTotal > numOfPageShowing &&
        pageIndex <= pageTotal - numberOfPageHiddingFromEnd && (
          <li className="pagination-item pagination-item--non-click">
            <div className="pageTotalpagination-item__link">...</div>
          </li>
        )}
    </>
  );
}
