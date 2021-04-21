import React from "react";
import { ProductContext } from "../context";
import { useContext } from "react";

export default function ProductCategory() {
  const context = useContext(ProductContext);
  const { type, filter, handleEvent } = context;
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
            onClick={handleEvent}
            className="app__category-item app__category-default app__category-item--active"
          >
            <p className="app__item-icon"></p>
            <p className="app__item-link">Sản phẩm</p>
          </li>
          <li
            data-name="type"
            data-value="shirt"
            onClick={handleEvent}
            className="app__category-item app__category-shirt"
          >
            <p className="app__item-link">Quần, áo</p>
          </li>
          <li
            data-name="type"
            data-value="shoe"
            onClick={handleEvent}
            className="app__category-item app__category-shoe"
          >
            <p className="app__item-link">Giày, dép</p>
          </li>
          <li
            data-name="type"
            data-value="bag"
            onClick={handleEvent}
            className="app__category-item app__category-bag"
          >
            <p className="app__item-link">Túi xách</p>
          </li>
          <li
            data-name="type"
            data-value="set"
            onClick={handleEvent}
            className="app__category-item app__category-set"
          >
            <p className="app__item-link">Set</p>
          </li>
          <li
            data-name="type"
            data-value="discount"
            onClick={handleEvent}
            className="app__category-item app__category-discount"
          >
            <p className="app__item-link">Giảm giá</p>
          </li>
          <li
            data-name="type"
            data-value="new"
            onClick={handleEvent}
            className="app__category-item app__category-new"
          >
            <p className="app__item-link">Hàng mới về</p>
          </li>
          <li
            data-name="type"
            data-value="accessories"
            onClick={handleEvent}
            className="app__category-item app__category-accessories"
          >
            <p className="app__item-link">Phụ kiện</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
