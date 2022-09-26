import React from "react";
import PropTypes from "prop-types";
import ProductCategory from "./ProductCategory";
import ProductFilter from "./ProductFilter";
import ProductList from "../Product/ProductList";
import Pagination from "../Pagination/Pagination";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/material";

const ProductContent = ({ isProductPage, isSearchPage }) => {
  return (
    <Grid2
      container
      maxWidth="100%"
      width="120rem"
      m="0 auto"
      sx={{
        flexDirection: { xs: "column", sm: "row" },
        padding: { xs: "0", sm: "0.3rem 0" },
      }}
    >
      <Grid2
        bgcolor="white"
        xs
        sm={2}
        sx={{
          position: { xs: "sticky", sm: "unset" },
          top: { xs: "6.5rem", sm: "unset" },
          zIndex: { xs: "3", sm: "0" },
          padding: { xs: "1rem 0", sm: "0" },
        }}
      >
        <ProductCategory
          isProductPage={isProductPage}
          isSearchPage={isSearchPage}
        ></ProductCategory>
      </Grid2>
      <Grid2 xs sm={10}>
        <ProductFilter
          isProductPage={isProductPage}
          isSearchPage={isSearchPage}
        ></ProductFilter>
        <ProductList
          isProductPage={isProductPage}
          isSearchPage={isSearchPage}
        ></ProductList>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Pagination
            isProductPage={isProductPage}
            isSearchPage={isSearchPage}
          ></Pagination>
        </Box>
      </Grid2>
    </Grid2>
  );
};

ProductContent.propTypes = {
  isProductPage: PropTypes.bool,
  isSearchPage: PropTypes.bool,
};

ProductContent.defaultProps = {
  isProductPage: false,
  isSearchPage: false,
};

export default ProductContent;
