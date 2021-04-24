import React from "react";
import { ProductContext } from "../context";
import { useContext } from "react";
import classNames from "classnames";

export default function ProductCategory() {
  const context = useContext(ProductContext);
  const { type, handleClick } = context;
  return (
    <div className="grid__col-2x">
      <div className="app__container-category">
        <div className="app__category-heading">
          <i className="app__heading-icon bi bi-list-ul"></i>Danh mục
        </div>
        <ul className="app__category-list">
          <li
            data-name="type"
            data-value="allProduct"
            onClick={handleClick}
            className={classNames(
              "app__category-item",
              "app__category-default",
              { "app__category-item--active": type === "allProduct" }
            )}
          >
            <p
              className={classNames({
                "app__item-icon": type === "allProduct",
              })}
            ></p>
            <p className="app__item-link">Sản phẩm</p>
          </li>
          <li
            data-name="type"
            data-value="shirt"
            onClick={handleClick}
            className={classNames("app__category-item", "app__category-shirt", {
              "app__category-item--active": type === "shirt",
            })}
          >
            <p
              className={classNames({
                "app__item-icon": type === "shirt",
              })}
            ></p>
            <p className="app__item-link">Quần, áo</p>
          </li>
          <li
            data-name="type"
            data-value="shoe"
            onClick={handleClick}
            className={classNames("app__category-item", "app__category-shoe", {
              "app__category-item--active": type === "shoe",
            })}
          >
            <p
              className={classNames({
                "app__item-icon": type === "shoe",
              })}
            ></p>
            <p className="app__item-link">Giày, dép</p>
          </li>
          <li
            data-name="type"
            data-value="bag"
            onClick={handleClick}
            className={classNames("app__category-item", "app__category-bag", {
              "app__category-item--active": type === "bag",
            })}
          >
            <p
              className={classNames({
                "app__item-icon": type === "bag",
              })}
            ></p>
            <p className="app__item-link">Túi xách</p>
          </li>
          <li
            data-name="type"
            data-value="set"
            onClick={handleClick}
            className={classNames("app__category-item", "app__category-set", {
              "app__category-item--active": type === "set",
            })}
          >
            <p
              className={classNames({
                "app__item-icon": type === "set",
              })}
            ></p>
            <p className="app__item-link">Set</p>
          </li>
          <li
            data-name="type"
            data-value="discount"
            onClick={handleClick}
            className={classNames(
              "app__category-item",
              "app__category-discount",
              { "app__category-item--active": type === "discount" }
            )}
          >
            <p
              className={classNames({
                "app__item-icon": type === "discount",
              })}
            ></p>
            <p className="app__item-link">Giảm giá</p>
          </li>
          <li
            data-name="type"
            data-value="new"
            onClick={handleClick}
            className={classNames("app__category-item", "app__category-new", {
              "app__category-item--active": type === "new",
            })}
          >
            <p
              className={classNames({
                "app__item-icon": type === "new",
              })}
            ></p>
            <p className="app__item-link">Hàng mới về</p>
          </li>
          <li
            data-name="type"
            data-value="accessories"
            onClick={handleClick}
            className={classNames(
              "app__category-item",
              "app__category-accessories",
              { "app__category-item--active": type === "accessories" }
            )}
          >
            <p
              className={classNames({
                "app__item-icon": type === "accessories",
              })}
            ></p>
            <p className="app__item-link">Phụ kiện</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
