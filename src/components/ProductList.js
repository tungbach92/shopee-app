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
    setSearchItems,
    setCategoryItems,
    setCategoryItemsFiltered,
    getCheckoutItemsFromStorage,
    setCheckoutItems,
    categoryItemsFiltered,
    similarItems,
    pageIndex,
    pageSize,
    setCategorySearchItems,
    categorySearchItemsFiltered,
    setCategorySearchItemsFiltered,
    loading,
    categoryItems,
  } = context;

  const xsBreakpointMatches = useMediaQuery("(max-width:600px)");
  const similarPageSize = 6;
  const searchPageSize = pageSize;

  // scrollToTop
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isProductPage) {
      setSearchItems([]);
      setCategorySearchItems([]);
      setCategorySearchItemsFiltered([]);
    }

    if (isSearchPage) {
      setCategoryItems([]);
      setCategoryItemsFiltered([]);
    }

    //get and set checkoutItems state
    const checkoutItems = getCheckoutItemsFromStorage();
    setCheckoutItems(checkoutItems);
  }, [
    getCheckoutItemsFromStorage,
    isProductPage,
    isSearchPage,
    setCategoryItems,
    setCategoryItemsFiltered,
    setCheckoutItems,
    setCategorySearchItemsFiltered,
    setCategorySearchItems,
    setSearchItems,
  ]);

  const getRenderItems = () => {
    let renderItem = [];
    if (isSearchPage) {
      renderItem = categorySearchItemsFiltered.slice(
        (pageIndex - 1) * searchPageSize,
        pageIndex * searchPageSize
      );
      if (xsBreakpointMatches) {
        renderItem = categorySearchItemsFiltered;
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
    return renderItem;
  };

  if (isSearchPage && getRenderItems().length === 0) {
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
  } else if (
    isProductPage &&
    (categoryItems.length === 0 || categoryItemsFiltered.length === 0)
  ) {
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
        Không có sản phẩm...
      </Box>
    );
  }
  return (
    <Grid2 container columnSpacing="0.5rem" rowSpacing="1rem" width="100%">
      {getRenderItems().map((item) => (
        <ProductItem
          key={item.id}
          item={item}
          similarDisPlay={similarDisPlay}
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

export default ProductList;
