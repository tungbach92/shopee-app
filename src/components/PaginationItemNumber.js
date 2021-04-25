import React from "react";
import { useContext } from "react";
import { ProductContext } from "../context";

export default function PaginationItemNumber() {
  const context = useContext(ProductContext);
  const { pageTotal, pageIndex, handleClick } = context;

  let jsxArray = [];

  for (let index = 3; index <= pageTotal; index++) {
    //Hiện 5 trang đầu
    if (pageIndex <= 5 && index <= 5) {
      jsxArray.push(
        <li
          key={index}
          data-name="pageIndex"
          data-value={index}
          onClick={handleClick}
          className="pagination-number"
        >
          <div className="pagination-item__link">{index}</div>
        </li>
      );
    }

    //Hiện 5 trang giữa
    else if (
      pageIndex >= 5 &&
      index <= pageIndex + 2 &&
      index >= pageIndex - 2
    ) {
      jsxArray.push(
        <li
          key={index}
          data-name="pageIndex"
          data-value={index}
          onClick={handleClick}
          className="pagination-number"
        >
          <div className="pagination-item__link">{index}</div>
        </li>
      );
    }

    //Hiện 5 trang cuối
    else if (pageIndex >= pageTotal - 2 && index > pageTotal - 5) {
      jsxArray.push(
        <li
          key={index}
          data-name="pageIndex"
          data-value={index}
          onClick={handleClick}
          className="pagination-number"
        >
          <div className="pagination-item__link">{index}</div>
        </li>
      );
    }
  }
  return jsxArray;
}
