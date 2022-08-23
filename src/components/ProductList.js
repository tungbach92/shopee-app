import React, { useContext, useEffect } from "react";
import { ProductContext } from "../context";
import ProductItem from "./ProductItem";
import PropTypes from "prop-types";
import { Box, useMediaQuery } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
function ProductList({ isProductPage, similarDisPlay, isSearchPage }) {
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
    setFilter,
    setFilterPrice,
    setCategory,
    loading,
  } = context;

  const xsBreakpointMatches = useMediaQuery("(max-width:600px)");
  const productPageIndex = 1;
  const similarPageIndex = 1;
  const similarPageSize = 6;
  const searchPageIndex = 1;
  const searchPageSize = pageSize;
  const category = "allProduct";
  const filter = "all";
  const filterPrice = "default";

  // scrollToTop
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // set default value for product page, search page
  useEffect(() => {
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

  //TODO: refactor, move all logic to pagination component
  //pagination value depend on page
  useEffect(() => {
    if (isProductPage) {
      const pageTotal = pageTotalCalc(categoryItemsFiltered, pageSize);
      setPageIndex(productPageIndex);
      setPageTotal(pageTotal);
    }
    if (isSearchPage) {
      const searchPageTotal = pageTotalCalc(searchItemFiltered, searchPageSize);
      setPageIndex(searchPageIndex);
      setPageTotal(searchPageTotal);
    }
    if (similarDisPlay) {
      const similarPageTotal = pageTotalCalc(similarItems, similarPageSize);
      setPageIndex(similarPageIndex);
      setPageTotal(similarPageTotal);
    }
  }, [
    categoryItemsFiltered,
    isProductPage,
    isSearchPage,
    pageSize,
    pageTotalCalc,
    searchItemFiltered,
    searchPageSize,
    setPageIndex,
    setPageTotal,
    similarDisPlay,
    similarItems,
  ]);

  const getRenderItems = () => {
    let renderItem = [];
    if (isSearchPage) {
      renderItem = searchItemFiltered.slice(
        (pageIndex - 1) * searchPageSize,
        pageIndex * searchPageSize
      );
      if (xsBreakpointMatches) {
        renderItem = searchItemFiltered;
      }
    }
    
    if (similarDisPlay) {
      renderItem = similarItems.slice(
        (pageIndex - 1) * similarPageSize,
        pageIndex * similarPageSize
      );
      if (xsBreakpointMatches) {
        renderItem = similarItems;
      }
    }
    
    if (isProductPage) {
      renderItem = categoryItemsFiltered.slice(
        (pageIndex - 1) * pageSize,
        pageIndex * pageSize
      );
      if (xsBreakpointMatches) {
        renderItem = categoryItemsFiltered;
      }
    }
    console.log(renderItem);
    return renderItem;
  };

  if (getRenderItems().length === 0 && isSearchPage) {
    return <div className="app__no-product">Không tìm thấy kết quả nào</div>;
  } else if (loading) {
    return (
      <Box
        sx={{
          flex: 1,
          textAlign: "center",
          padding: "14.5rem",
          fontSize: "1.6rem",
          color: "var(--primary-color)",
          fontWeight: "600",
        }}
      >
        Loading...
      </Box>
    );
  }
  return (
    <Grid2 container columnSpacing="0.5rem" rowSpacing="1rem" width="100%">
      {getRenderItems().map((item) => (
        <ProductItem
          key={item.id}
          cartItems={cartItems}
          similarDisPlay={similarDisPlay}
          item={item}
          handleClick={handleClick}
        ></ProductItem>
      ))}
    </Grid2>
  );
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

export default React.memo(ProductList);
