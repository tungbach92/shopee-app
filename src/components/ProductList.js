import React, { useContext, useEffect } from "react";
import { ProductContext } from "../context";
import ProductItem from "./ProductItem";
import PropTypes from "prop-types";

export default function ProductList({
  isProductPage,
  similarDisPlay,
  isSearchPage,
}) {
  // const _isMounted = useRef(true);
  const context = useContext(ProductContext);
  let {
    user,
    items,
    setCategoryProduct,
    setSortedProducts,
    setPageIndex,
    setPageTotal,
    getCheckoutItemsFromStorage,
    setCheckoutProduct,
    sortedItems,
    similarItems,
    cartItems,
    pageIndex,
    pageSize,
    handleClick,
    sortedSearchItems,
    searchItems,
    setSortedSearchItems,
    pageTotalCalc,
    setPageSize,
    setFilter,
    setFilterPrice,
    setType,
    loading,
  } = context;

  // set default value for product page
  useEffect(() => {
    const type = "allProduct";
    const filterPrice = "default";
    setType(type);
    setFilter("");
    setFilterPrice(filterPrice);

    //set SortItems by default value
    const categoryItems = items.filter((item) => item.type !== type);
    const sortedItems = [...categoryItems];

    //get and set checkoutItems state
    const checkoutItems = getCheckoutItemsFromStorage();
    setCategoryProduct(categoryItems);
    setSortedProducts(sortedItems);
    setCheckoutProduct(checkoutItems);
  }, [
    getCheckoutItemsFromStorage,
    items,
    setCategoryProduct,
    setCheckoutProduct,
    setFilter,
    setFilterPrice,
    setSortedProducts,
    setType,
  ]);

  useEffect(() => {
    if (isProductPage) {
      //pagination value, recalculate pageTotal
      const pageIndex = 1;
      const pageSize = 10;
      const pageTotal = pageTotalCalc(sortedItems, pageSize);
      setPageIndex(pageIndex);
      setPageSize(pageSize);
      setPageTotal(pageTotal);
    } else if (isSearchPage) {
      const searchPageIndex = 1;
      const searchPageSize = 10;
      const searchPageTotal = pageTotalCalc(sortedSearchItems, searchPageSize);
      setPageIndex(searchPageIndex);
      setPageSize(searchPageSize);
      setPageTotal(searchPageTotal);
    } else if (similarDisPlay) {
      const similarPageIndex = 1;
      const similarPageSize = 6;
      const similarPageTotal = pageTotalCalc(similarItems, similarPageSize);
      setPageIndex(similarPageIndex);
      setPageSize(similarPageSize);
      setPageTotal(similarPageTotal);
    }
  }, [
    isProductPage,
    isSearchPage,
    pageTotalCalc,
    setPageIndex,
    setPageSize,
    setPageTotal,
    similarDisPlay,
    similarItems,
    sortedItems,
    sortedSearchItems,
  ]);

  let renderItem = [];
  if (isSearchPage) {
    renderItem = sortedSearchItems.slice(
      (pageIndex - 1) * pageSize,
      pageIndex * pageSize
    );
  } else if (similarDisPlay) {
    renderItem = similarItems.slice(
      (pageIndex - 1) * pageSize,
      pageIndex * pageSize
    );
  } else {
    renderItem = sortedItems.slice(
      (pageIndex - 1) * pageSize,
      pageIndex * pageSize
    );
  }
  useEffect(() => {
    setSortedSearchItems(searchItems);
  }, [searchItems, setSortedSearchItems]);
  if (renderItem.length === 0 && isSearchPage) {
    return <div className="app__no-product">Không tìm thấy kết quả nào</div>;
  } else if (loading) {
    return <div className="app__no-product">Loading...</div>;
  }
  return renderItem.map((item, index) => (
    <ProductItem
      key={item.id}
      cartItems={cartItems}
      similarDisPlay={similarDisPlay}
      item={item}
      handleClick={handleClick}
      user={user}
    ></ProductItem>
  ));
}

ProductList.propTypes = {
  isSearchPage: PropTypes.bool,
  isProductPage: PropTypes.bool,
  similarDisPlay: PropTypes.bool,
};

ProductList.defaultProps = {
  isSearchPage: false,
  isProductPage: false,
  similarDisPlay: false,
};
