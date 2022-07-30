import React from "react";
import { ProductContext } from "../context";
import { useContext } from "react";
import classNames from "classnames";

export default function ProductCategory() {
  const context = useContext(ProductContext);
  const { category, handleClick } = context;
  return (
    <div className="grid__col-2x">
      <div className="app__container-category">
        <div className="app__category-heading">
          <i className="app__heading-icon bi bi-list-ul"></i>Danh mục
        </div>
        <ul className="app__category-list">
          <li
            data-name="category"
            data-value="allProduct"
            onClick={handleClick}
            className={classNames(
              "app__category-item",
              "app__category-default",
              { "app__category-item--active": category === "allProduct" }
            )}
          >
            <p
              className={classNames({
                "app__item-icon": category === "allProduct",
              })}
            ></p>
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
            <p
              className={classNames({
                "app__item-icon": category === "shirt",
              })}
            ></p>
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
            <p
              className={classNames({
                "app__item-icon": category === "pant",
              })}
            ></p>
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
            <p
              className={classNames({
                "app__item-icon": category === "shoe",
              })}
            ></p>
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
            <p
              className={classNames({
                "app__item-icon": category === "bag",
              })}
            ></p>
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
            <p
              className={classNames({
                "app__item-icon": category === "set",
              })}
            ></p>
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
            <p
              className={classNames({
                "app__item-icon": category === "accessories",
              })}
            ></p>
            <p className="app__item-link">Phụ kiện</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
