import React from "react";
import ProductCategory from "./ProductCategory";
import ProductFilter from "./ProductFilter";
import ProductList from "./ProductList";
import Pagination from "./Pagination";

export default function ProductContainer() {
  return (
    <div class="grid">
      <div class="grid__row grid__row--padtb3">
        <ProductCategory></ProductCategory>
        <div class="grid__col-10x">
          <ProductFilter></ProductFilter>
          <ProductList></ProductList>
        </div>
        <Pagination></Pagination>
      </div>
    </div>
  );
}
