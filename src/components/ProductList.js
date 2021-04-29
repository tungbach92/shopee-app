import React, { Component } from "react";
import { ProductContext } from "../context";
import ProductItem from "./ProductItem";
export default class ProductList extends Component {
  static contextType = ProductContext;
  render() {
    const {
      sortedItems,
      cartItems,
      pageIndex,
      pageSize,
      handleClick,
    } = this.context;
    let items = sortedItems.slice(
      (pageIndex - 1) * pageSize,
      pageIndex * pageSize
    );
    return items.map((item) => (
      <ProductItem
        key={item.id}
        cartItems={cartItems}
        item={item}
        event={handleClick}
      ></ProductItem>
    ));
  }
}
