import React, { useEffect } from "react";
import ProductItem from "./ProductItem";
import PropTypes from "prop-types";
import { Box, useMediaQuery } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { ClipLoader } from "react-spinners";
import { useProductsAndSearch } from "../../context/ProductsAndSearchProvider";
function ProductList({ items, pageIndex, pageSize }) {
  const { itemsLoading } = useProductsAndSearch();

  const xsBreakpointMatches = useMediaQuery("(max-width:600px)");
  const similarPageSize = 6;

  // scrollToTop
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getRenderItemsByPageAndPagination = () => {
    let renderItem = [];
    renderItem = items.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    if (xsBreakpointMatches) {
      renderItem = items;
    }
    return renderItem;
  };

  if (itemsLoading) {
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

  if (getRenderItemsByPageAndPagination().length === 0) {
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
