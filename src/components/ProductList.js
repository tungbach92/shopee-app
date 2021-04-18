import React, { Component } from "react";
import { ProductContext } from "../context";
import ProductItem from "./ProductItem";
export default class ProductList extends Component {
  static contextType = ProductContext;
  render() {
    let value = this.context;
    const {
      tempItems,
      categoryItems,
      sortedItems,
      today,
      defaultPageIndex,
      bestSelling,
    } = value;

    return tempItems.map((item) => 
       <ProductItem key={item.id} item={item}></ProductItem>
    );
  }
}
