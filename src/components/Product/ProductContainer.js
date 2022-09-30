import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ProductCategory from "./ProductCategory";
import ProductFilter from "./ProductFilter";
import ProductList from "./ProductList";
import Pagination from "../Pagination/Pagination";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/material";
import { useState } from "react";
import * as categoryType from "../../constants/category";
import * as sortType from "../../constants/sort";
import ProductProvider from "../../ProductProvider";

const ProductContainer = ({ items, isProductPage, isSearchPage }) => {
  const [categoryItems, setCategoryItems] = useState(items);
  const [filteredItems, setFilteredItems] = useState(items);
  const [category, setCategory] = useState(categoryType.ALL_PRODUCT);
  const [sort, setSort] = useState(sortType.ALL);
  const [sortPrice, setSortPrice] = useState(sortType.DEFAULT_PRICE);
  const [startPrice, setStartPrice] = useState("");
  const [endPrice, setEndPrice] = useState("");
  const newestDays = 30;
  const oneDayinMs = 24 * 3600 * 1000;
  const currentTimeinMs = new Date().valueOf();
  const bestSelling = 1000;

  useEffect(() => {
    setFilteredItems(items);
    setCategoryItems(items);
  }, [items]);

  const handleItemsByCategory = (category) => {
    let categoryItems = [...items];
    if (category !== categoryType.ALL_PRODUCT) {
      categoryItems = items.filter((item) => item.category === category);
    }
    setCategoryItems(categoryItems);
    setFilteredItems(categoryItems);
    setSort(sortType.ALL);
    setSortPrice(sortType.DEFAULT_PRICE);
  };

  const handleCategoryItemsBySort = (sort) => {
    let sortItems = [...categoryItems];
    // Best Selling sort
    if (sort === sortType.BEST_SELLING) {
      sortItems = categoryItems.filter(
        (item) => item.soldAmount >= bestSelling
      );
    }

    // Date sort
    if (sort === sortType.DATE) {
      sortItems = categoryItems.filter(
        (item) =>
          Math.floor(new Date(item.date).valueOf() / oneDayinMs) >
          Math.floor(currentTimeinMs / oneDayinMs) - newestDays
      );
    }

    // priceAsc sort
    if (sort === sortType.PRICE_ASC) {
      sortItems = [...filteredItems].sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
    }
    // priceDesc sort
    if (sort === sortType.PRICE_DESC) {
      sortItems = [...filteredItems].sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );
    }
    setFilteredItems(sortItems);
  };

  const handleRating = (ratingValue) => {
    const ratingItems = categoryItems.filter(
      (item) => item.rating >= ratingValue
    );
    setFilteredItems(ratingItems);
  };

  const handleFilerPriceRange = () => {
    let filterItems = [...categoryItems];
    if (startPrice.length > 0 && endPrice.length === 0) {
      filterItems = categoryItems.filter(
        (item) => item.price >= Number(startPrice)
      );
    }
    if (startPrice.length > 0 && endPrice.length > 0) {
      filterItems = categoryItems.filter(
        (item) =>
          item.price >= Number(startPrice) && item.price <= Number(endPrice)
      );
    }
    if (startPrice.length === 0 && endPrice.length > 0) {
      filterItems = categoryItems.filter(
        (item) => item.price <= Number(endPrice)
      );
    }
    setFilteredItems(filterItems);
  };

  const handleResetAll = () => {
    setCategory(categoryType.ALL_PRODUCT);
    setSort(sortType.ALL);
    setSortPrice(sortType.DEFAULT_PRICE);
    setCategoryItems(items);
    setFilteredItems(items);
  };

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
          category={category}
          setCategory={setCategory}
          filteredItems={filteredItems}
          handleItemsByCategory={handleItemsByCategory}
          handleRating={handleRating}
          handleFilerPriceRange={handleFilerPriceRange}
          startPrice={startPrice}
          setStartPrice={setStartPrice}
          endPrice={endPrice}
          setEndPrice={setEndPrice}
          handleResetAll={handleResetAll}
        ></ProductCategory>
      </Grid2>
      <Grid2 xs sm={10}>
        <ProductProvider>
          <ProductFilter
            sort={sort}
            setSort={setSort}
            sortPrice={sortPrice}
            setSortPrice={setSortPrice}
            handleCategoryItemsBySort={handleCategoryItemsBySort}
            categoryItems={categoryItems}
            filteredItems={filteredItems}
          ></ProductFilter>
        </ProductProvider>
        <ProductProvider>
          <ProductList items={filteredItems}></ProductList>
        </ProductProvider>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <ProductProvider>
            <Pagination
              items={filteredItems}
              isProductPage={isProductPage}
              isSearchPage={isSearchPage}
            ></Pagination>
          </ProductProvider>
        </Box>
      </Grid2>
    </Grid2>
  );
};

ProductContainer.propTypes = {
  isProductPage: PropTypes.bool,
  isSearchPage: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

ProductContainer.defaultProps = {
  isProductPage: false,
  isSearchPage: false,
};

export default ProductContainer;
