import React, { Component } from "react";
import { ProductContext } from "../context";
import ProductItem from "./ProductItem";
export default class ProductList extends Component {
  static contextType = ProductContext;
  render() {
    let value = this.context;
    const { sortedItems, pageIndex, pageSize } = value;
    let items = sortedItems.slice(
      (pageIndex - 1) * pageSize,
      pageIndex * pageSize
    );
    return items.map((item) => (
      <ProductItem key={item.id} item={item}></ProductItem>
    ));
  }
}
