import React from "react";
import ProductCategory from "./ProductCategory";
import ProductFilter from "./ProductFilter";
import ProductList from "./ProductList";
import Pagination from "./Pagination";

export default function ProductContainer() {
  return (
    <div className="grid">
      <div className="grid__row grid__row--padtb3">
        <ProductCategory></ProductCategory>
        <div className="grid__col-10x">
          <ProductFilter></ProductFilter>
          <div className="grid__row grid__row-product">
            <ProductList></ProductList>
          </div>
          <Pagination></Pagination>
        </div>
      </div>
    </div>
  );
}
