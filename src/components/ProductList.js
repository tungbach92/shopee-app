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
    items,
    setCategoryItems,
    setCategoryItemsFiltered,
    setPageIndex,
    setPageTotal,
    getCheckoutItemsFromStorage,
    setCheckoutItems,
    categoryItemsFiltered,
    similarItems,
    cartItems,
    pageIndex,
    pageSize,
    handleClick,
    searchItemFiltered,
    searchItems,
    setSearchItemFiltered,
    pageTotalCalc,
    setPageSize,
    setFilter,
    setFilterPrice,
    setCategory,
    loading,
  } = context;

  // set default value for product page, search page
  useEffect(() => {
    const category = "allProduct";
    const filter = "all";
    const filterPrice = "default";
    setCategory(category);
    setFilter(filter);
    setFilterPrice(filterPrice);

    //set categoryItemsFiltered by default value
    const categoryItems = items.filter((item) => item.category !== category);
    const categoryItemsFiltered = [...categoryItems];
    setCategoryItems(categoryItems);
    setCategoryItemsFiltered(categoryItemsFiltered);

    //get and set checkoutItems state
    const checkoutItems = getCheckoutItemsFromStorage();
    setCheckoutItems(checkoutItems);

    //set SearchItemFiltered by default value
    setSearchItemFiltered(searchItems);
  }, [
    getCheckoutItemsFromStorage,
    items,
    setCategoryItems,
    setCheckoutItems,
    setFilter,
    setFilterPrice,
    setCategoryItemsFiltered,
    setCategory,
    searchItems,
    setSearchItemFiltered,
  ]);

  //pagination value depend on page
  useEffect(() => {
    if (isProductPage) {
      const pageIndex = 1;
      const pageSize = 10;
      const pageTotal = pageTotalCalc(categoryItemsFiltered, pageSize);
      setPageIndex(pageIndex);
      setPageSize(pageSize);
      setPageTotal(pageTotal);
    }
    if (isSearchPage) {
      const searchPageIndex = 1;
      const searchPageSize = 10;
      const searchPageTotal = pageTotalCalc(searchItemFiltered, searchPageSize);
      setPageIndex(searchPageIndex);
      setPageSize(searchPageSize);
      setPageTotal(searchPageTotal);
    }
    if (similarDisPlay) {
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
    categoryItemsFiltered,
    searchItemFiltered,
  ]);

  const getRenderItems = () => {
    let renderItem = [];
    if (isSearchPage) {
      renderItem = searchItemFiltered.slice(
        (pageIndex - 1) * pageSize,
        pageIndex * pageSize
      );
    }
    if (similarDisPlay) {
      renderItem = similarItems.slice(
        (pageIndex - 1) * pageSize,
        pageIndex * pageSize
      );
    }
    if (isProductPage) {
      renderItem = categoryItemsFiltered.slice(
        (pageIndex - 1) * pageSize,
        pageIndex * pageSize
      );
    }
    return renderItem;
  };

  if (getRenderItems().length === 0 && isSearchPage) {
    return <div className="app__no-product">Không tìm thấy kết quả nào</div>;
  } else if (loading) {
    return <div className="app__no-product">Loading...</div>;
  }
  return getRenderItems().map((item) => (
    <ProductItem
      key={item.id}
      cartItems={cartItems}
      similarDisPlay={similarDisPlay}
      item={item}
      handleClick={handleClick}
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
