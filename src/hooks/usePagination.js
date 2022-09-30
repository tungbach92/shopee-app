import { useLayoutEffect } from "react";
import { useMemo, useState } from "react";

const usePagination = (items) => {
  const defaultPageIndex = 1;
  const pageSize = 10;
  const orderPageSize = 2;
  const similarPageSize = 6;
  const [pageIndex, setPageIndex] = useState(defaultPageIndex);

  useLayoutEffect(() => {
    setPageIndex(defaultPageIndex);
  }, [items]);

  const pageTotal = useMemo(() => {
    const getPageTotal = (numOfItems) => {
      return Math.ceil(numOfItems / pageSize) < 1
        ? 1
        : Math.ceil(numOfItems / pageSize);
    };
    return getPageTotal(items.length);
  }, [items.length, pageSize]);

  return {
    pageIndex,
    setPageIndex,
    pageSize,
    orderPageSize,
    similarPageSize,
    pageTotal,
  };
};
export default usePagination;
