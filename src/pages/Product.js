import React from "react";
import ProductCategory from "../components/ProductCategory";
import ProductFilter from "../components/ProductFilter";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import Header from "../components/Header/Header";

export default function Product() {
  return (
    <>
      <Header isProductPage={true}></Header>
      <div className="grid">
        <div className="grid__row grid__row--padtb3">
          <ProductCategory></ProductCategory>
          <div className="grid__col-10x">
            <ProductFilter isProductPage={true}></ProductFilter>
            <div className="grid__row grid__row-product">
              <ProductList isProductPage={true}></ProductList>
            </div>
            <Pagination isProductPage={true}></Pagination>
          </div>
        </div>
      </div>
    </>
  );
}
