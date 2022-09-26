import React, { useEffect } from "react";
import { useProduct } from "../../ProductProvider";
import ProductItem from "./ProductItem";
import PropTypes from "prop-types";
import { Box, useMediaQuery } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { ClipLoader } from "react-spinners";
function ProductList({ isProductPage, similarDisPlay, isSearchPage }) {
  let {
    setSearchItems,
    setCategoryItems,
    setCategoryItemsFiltered,
    categoryItemsFiltered,
    similarItems,
    pageIndex,
    pageSize,
    setCategorySearchItems,
    categorySearchItemsFiltered,
    setCategorySearchItemsFiltered,
    productLoading,
  } = useProduct();

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
  }, [
    isProductPage,
    isSearchPage,
    setCategoryItems,
    setCategoryItemsFiltered,
    setCategorySearchItems,
    setCategorySearchItemsFiltered,
    setSearchItems,
  ]);

  const getRenderItemsByPageAndPagination = () => {
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

  if (productLoading) {
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
        <ClipLoader color="var(--primary-color)" />
      </Box>
    );
  }

  if (isSearchPage && getRenderItemsByPageAndPagination().length === 0) {
    return <div className="app__no-product">Không tìm thấy kết quả nào</div>;
  }

  if (isProductPage && getRenderItemsByPageAndPagination().length === 0) {
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
      {getRenderItemsByPageAndPagination().map((item) => (
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
