import React from "react";
import { ProductContext } from "../context";
import { useContext } from "react";
import classNames from "classnames";
import { Box } from "@mui/material";

export default function ProductCategory() {
  const context = useContext(ProductContext);
  const { category, handleClick } = context;
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
    </div>
  );
}
