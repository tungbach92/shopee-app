import React, { useEffect, useState } from "react";
import { ProductContext } from "../context";
import { useContext } from "react";
import classNames from "classnames";
import {
  Box,
  Button,
  Rating,
  styled,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FilterAlt } from "@mui/icons-material";

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  marginBottom: "0.6rem",
});

const StyledTypography = styled(Typography)({
  fontSize: "1.3rem",
  marginLeft: "0.6rem",
});

const StyledTextField = styled(TextField)({
  width: "40%",
  "& .MuiInputBase-input, & .MuiOutlinedInput-input": {
    padding: "0.45rem 0.6rem",
    fontSize: "1.2rem",
  },
});

export default function ProductCategory({ isProductPage, isSearchPage }) {
  const context = useContext(ProductContext);
  const {
    category,
    handleClick,
    categoryItems,
    categoryItemsFiltered,
    categorySearchItems,
    categorySearchItemsFiltered,
    setCategoryItems,
    setCategoryItemsFiltered,
    setCategorySearchItems,
    setCategorySearchItemsFiltered,
    setCategory,
    setFilter,
    setFilterPrice,
    items,
    searchItems,
  } = context;
  const [startPrice, setStartPrice] = useState("");
  const [endPrice, setEndPrice] = useState("");
  const xsBreakpointMatches = useMediaQuery("(max-width:600px)");
  const fiveRating = 5;
  const fourRating = 4;
  const threeRating = 3;
  const twoRating = 2;
  const oneRating = 1;
  const defaultCategory = "allProduct";
  const defaultFilter = "all";
  const defaultFilterPrice = "default";

  const filterDisabled =
    (isProductPage &&
      (categoryItems.length === 0 || categoryItemsFiltered.length === 0)) ||
    (isSearchPage &&
      (categorySearchItems.length === 0 ||
        categorySearchItemsFiltered.length === 0));

  useEffect(() => {
    setCategory(defaultCategory);

    if (isProductPage) {
      const categoryItems = items.filter(
        (item) => item.category !== defaultCategory
      );
      const categoryItemsFiltered = [...categoryItems];
      setCategoryItems(categoryItems);
      setCategoryItemsFiltered(categoryItemsFiltered);
    }

    if (isSearchPage) {
      const categorySearchItems = searchItems.filter(
        (item) => item.category !== defaultCategory
      );
      const categorySearchItemsFiltered = [...categorySearchItems];
      setCategorySearchItems(categorySearchItems);
      setCategorySearchItemsFiltered(categorySearchItemsFiltered);
    }
  }, [
    isProductPage,
    isSearchPage,
    items,
    searchItems,
    setCategory,
    setCategoryItems,
    setCategoryItemsFiltered,
    setCategorySearchItems,
    setCategorySearchItemsFiltered,
  ]);

  const handleResetAll = () => {
    setCategory(defaultCategory);
    setFilter(defaultFilter);
    setFilterPrice(defaultFilterPrice);
    //set categoryItemsFiltered by default value
    if (isProductPage) {
      const categoryItems = items.filter(
        (item) => item.category !== defaultCategory
      );
      const categoryItemsFiltered = [...categoryItems];
      setCategoryItems(categoryItems);
      setCategoryItemsFiltered(categoryItemsFiltered);
    }
    if (isSearchPage) {
      const categorySearchItems = searchItems.filter(
        (item) => item.category !== defaultCategory
      );
      const categorySearchItemsFiltered = [...categorySearchItems];
      setCategorySearchItems(categorySearchItems);
      setCategorySearchItemsFiltered(categorySearchItemsFiltered);
    }
  };

  const handleRating = (ratingValue) => {
    if (isProductPage) {
      let ratingCategoryItems = [...categoryItems];
      ratingCategoryItems = ratingCategoryItems.filter(
        (item) => item.rating >= ratingValue
      );
      setCategoryItems(ratingCategoryItems);
      setCategoryItemsFiltered(ratingCategoryItems);
    }

    if (isSearchPage) {
      let ratingCategorySearchItems = [...categorySearchItems];
      ratingCategorySearchItems = ratingCategorySearchItems.filter(
        (item) => item.rating >= ratingValue
      );
      setCategorySearchItems(ratingCategorySearchItems);
      setCategorySearchItemsFiltered(ratingCategorySearchItems);
    }
  };

  const handleFilerPriceRange = () => {
    if (isProductPage) {
      let priceRangeCategoryItems = [...categoryItems];
      if (startPrice.length > 0 && endPrice.length === 0) {
        priceRangeCategoryItems = priceRangeCategoryItems.filter(
          (item) => item.price >= Number(startPrice)
        );
        setCategoryItems(priceRangeCategoryItems);
        setCategoryItemsFiltered(priceRangeCategoryItems);
      }
      if (startPrice.length > 0 && endPrice.length > 0) {
        priceRangeCategoryItems = priceRangeCategoryItems.filter(
          (item) =>
            item.price >= Number(startPrice) && item.price <= Number(endPrice)
        );
        setCategoryItems(priceRangeCategoryItems);
        setCategoryItemsFiltered(priceRangeCategoryItems);
      }
      if (startPrice.length === 0 && endPrice.length > 0) {
        priceRangeCategoryItems = priceRangeCategoryItems.filter(
          (item) => item.price <= Number(endPrice)
        );
        setCategoryItems(priceRangeCategoryItems);
        setCategoryItemsFiltered(priceRangeCategoryItems);
      }
    }

    if (isSearchPage) {
      let priceRangeCategorySearchItems = [...categoryItems];
      if (startPrice.length > 0 && endPrice.length === 0) {
        priceRangeCategorySearchItems = priceRangeCategorySearchItems.filter(
          (item) => item.price >= Number(startPrice)
        );
        setCategorySearchItems(priceRangeCategorySearchItems);
        setCategorySearchItemsFiltered(priceRangeCategorySearchItems);
      }
      if (startPrice.length > 0 && endPrice.length > 0) {
        priceRangeCategorySearchItems = priceRangeCategorySearchItems.filter(
          (item) =>
            item.price >= Number(startPrice) && item.price <= Number(endPrice)
        );
        setCategorySearchItems(priceRangeCategorySearchItems);
        setCategorySearchItemsFiltered(priceRangeCategorySearchItems);
      }
      if (startPrice.length === 0 && endPrice.length > 0) {
        priceRangeCategorySearchItems = priceRangeCategorySearchItems.filter(
          (item) => item.price <= Number(endPrice)
        );
        setCategorySearchItems(priceRangeCategorySearchItems);
        setCategorySearchItemsFiltered(priceRangeCategorySearchItems);
      }
    }
  };

  return (
    <div className="app__container-category">
      <div className="app__category-heading">
        <i className="app__heading-icon bi bi-list-ul"></i>Danh mục
      </div>
      <ul className="app__category-list">
        <li
          data-name="category"
          data-value="allProduct"
          onClick={handleClick}
          className={classNames("app__category-item", "app__category-default", {
            "app__category-item--active": category === "allProduct",
          })}
        >
          <Box
            component="p"
            sx={{
              className: {
                xs: "",
                sm: category === "allProduct" && "app__item-icon",
              },
            }}
          ></Box>
          <p className="app__item-link">Tất cả sản phẩm</p>
        </li>
        <li
          data-name="category"
          data-value="shirt"
          onClick={handleClick}
          className={classNames("app__category-item", "app__category-shirt", {
            "app__category-item--active": category === "shirt",
          })}
        >
          <Box
            component="p"
            sx={{
              className: {
                xs: "",
                sm: category === "shirt" && "app__item-icon",
              },
            }}
          ></Box>
          <p className="app__item-link">Áo</p>
        </li>
        <li
          data-name="category"
          data-value="pant"
          onClick={handleClick}
          className={classNames(
            "app__category-item",
            "app__category-discount",
            { "app__category-item--active": category === "pant" }
          )}
        >
          <Box
            component="p"
            sx={{
              className: {
                xs: "",
                sm: category === "pant" && "app__item-icon",
              },
            }}
          ></Box>
          <p className="app__item-link">Quần</p>
        </li>
        <li
          data-name="category"
          data-value="shoe"
          onClick={handleClick}
          className={classNames("app__category-item", "app__category-shoe", {
            "app__category-item--active": category === "shoe",
          })}
        >
          <Box
            component="p"
            sx={{
              className: {
                xs: "",
                sm: category === "shoe" && "app__item-icon",
              },
            }}
          ></Box>
          <p className="app__item-link">Giày, dép</p>
        </li>
        <li
          data-name="category"
          data-value="bag"
          onClick={handleClick}
          className={classNames("app__category-item", "app__category-bag", {
            "app__category-item--active": category === "bag",
          })}
        >
          <Box
            component="p"
            sx={{
              className: {
                xs: "",
                sm: category === "bag" && "app__item-icon",
              },
            }}
          ></Box>
          <p className="app__item-link">Túi xách</p>
        </li>
        <li
          data-name="category"
          data-value="set"
          onClick={handleClick}
          className={classNames("app__category-item", "app__category-set", {
            "app__category-item--active": category === "set",
          })}
        >
          <Box
            component="p"
            sx={{
              className: {
                xs: "",
                sm: category === "set" && "app__item-icon",
              },
            }}
          ></Box>
          <p className="app__item-link">Set</p>
        </li>
        <li
          data-name="category"
          data-value="accessories"
          onClick={handleClick}
          className={classNames(
            "app__category-item",
            "app__category-accessories",
            { "app__category-item--active": category === "accessories" }
          )}
        >
          <Box
            component="p"
            sx={{
              className: {
                xs: "",
                sm: category === "accessories" ? "app__item-icon" : "",
              },
            }}
          ></Box>
          <p className="app__item-link">Phụ kiện</p>
        </li>
      </ul>

      {/* TODO: Responsive price range and rating */}
      {!xsBreakpointMatches && (
        <>
          <Box
            p="2rem 0"
            sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.05)" }}
            display="flex"
            alignItems="center"
          >
            <FilterAlt></FilterAlt>
            <Typography ml="1rem" fontSize="1.6rem" variant="h6">
              Bộ lọc tìm kiếm
            </Typography>
          </Box>
          <Box
            p="2rem 0"
            sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.05)" }}
          >
            <Typography fontSize="1.4rem">Khoảng giá</Typography>
            <Box
              mt="1rem"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <StyledTextField
                type="text"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                name="startPrice"
                value={startPrice}
                onChange={(e) => {
                  e.target.value = e.target.value
                    .replace(/[^0-9.]/g, "")
                    .replace(/(\..*)\./g, "$1");
                  setStartPrice(e.target.value);
                }}
                placeholder="Từ"
                size="small"
                disabled={filterDisabled}
              ></StyledTextField>
              <Typography fontSize="1.4rem">-</Typography>
              <StyledTextField
                type="text"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                name="endPrice"
                value={endPrice}
                onChange={(e) => {
                  e.target.value = e.target.value
                    .replace(/[^0-9.]/g, "")
                    .replace(/(\..*)\./g, "$1");
                  setEndPrice(e.target.value);
                }}
                placeholder="Đến"
                size="small"
                disabled={filterDisabled}
              ></StyledTextField>
            </Box>
            <Button
              variant="contained"
              fullWidth
              sx={{
                marginTop: "1rem",
                fontSize: "1.3rem",
                color: "white",
                "&:disabled": { cursor: "not-allowed" },
              }}
              onClick={handleFilerPriceRange}
              disabled={filterDisabled}
            >
              Áp dụng
            </Button>
          </Box>
          <Box
            sx={{
              padding: "2rem 0",
              borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
            }}
          >
            <Typography
              sx={{ fontSize: "1.4rem", marginBottom: "0.6rem" }}
              component="p"
            >
              Đánh giá
            </Typography>
            <StyledBox
              onClick={() => !filterDisabled && handleRating(fiveRating)}
            >
              <Rating
                name="fiveRating"
                defaultValue={fiveRating}
                readOnly
                disabled={filterDisabled}
              />
            </StyledBox>
            <StyledBox
              onClick={() => !filterDisabled && handleRating(fourRating)}
            >
              <Rating
                name="fourRating"
                defaultValue={fourRating}
                readOnly
                disabled={filterDisabled}
              />
              <StyledTypography>trở lên</StyledTypography>
            </StyledBox>
            <StyledBox
              onClick={() => !filterDisabled && handleRating(threeRating)}
            >
              <Rating
                name="threeRating"
                defaultValue={threeRating}
                readOnly
                disabled={filterDisabled}
              />
              <StyledTypography>trở lên</StyledTypography>
            </StyledBox>
            <StyledBox
              onClick={() => !filterDisabled && handleRating(twoRating)}
            >
              <Rating
                name="twoRating"
                defaultValue={twoRating}
                readOnly
                disabled={filterDisabled}
              />
              <StyledTypography>trở lên</StyledTypography>
            </StyledBox>
            <StyledBox
              onClick={() => !filterDisabled && handleRating(oneRating)}
            >
              <Rating
                name="oneRating"
                defaultValue={oneRating}
                readOnly
                disabled={filterDisabled}
              />
              <StyledTypography>trở lên</StyledTypography>
            </StyledBox>
          </Box>
          <Button
            variant="contained"
            fullWidth
            sx={{
              marginTop: "1rem",
              fontSize: "1.3rem",
              color: "white",
            }}
            onClick={handleResetAll}
          >
            Xoá tất cả
          </Button>
        </>
      )}
    </div>
  );
}
