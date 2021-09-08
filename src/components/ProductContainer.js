import React from "react";
import ProductCategory from "./ProductCategory";
import ProductFilter from "./ProductFilter";
import ProductList from "./ProductList";
import Pagination from "./Pagination";

export default function ProductContainer({ isSearchPage, isProductPage }) {
  return (
    <div className="grid">
      <div className="grid__row grid__row--padtb3">
        {isSearchPage ? null : <ProductCategory></ProductCategory>}
        <div className={isSearchPage ? "grid__col-12x" : "grid__col-10x"}>
          <ProductFilter isSearchPage={isSearchPage}></ProductFilter>
          <div className="grid__row grid__row-product">
            <ProductList
              isProductPage={isProductPage}
              isSearchPage={isSearchPage}
            ></ProductList>
          </div>
          <Pagination
            isProductPage={isProductPage}
            isSearchPage={isSearchPage}
          ></Pagination>
        </div>
      </div>
    </div>
  );
}
