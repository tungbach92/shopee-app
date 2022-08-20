import React from "react";
import ProductCategory from "../components/ProductCategory";
import ProductFilter from "../components/ProductFilter";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import Header from "../components/Header/Header";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/material";

export default function Product() {
  return (
    <>
      <Header isProductPage={true}></Header>

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
            top: { xs: "8.5rem", sm: "unset" },
            zIndex: { xs: "3", sm: "0" },
            padding: { xs: "1rem 0", sm: "0" },
          }}
        >
          <ProductCategory></ProductCategory>
        </Grid2>
        <Grid2 xs sm={10}>
          <ProductFilter isProductPage={true}></ProductFilter>
          <ProductList isProductPage={true}></ProductList>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Pagination isProductPage={true}></Pagination>
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
}
