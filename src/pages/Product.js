import React from "react";
import ProductContainer from "../components/ProductContainer";
import Header from "../components/Header";
import ProductCategory from "../components/ProductCategory";
import ProductFilter from "../components/ProductFilter";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
export default function Product() {
  return (
    <>
      <Header isProductPage={true}></Header>
      <ProductContainer
        productCategory={<ProductCategory></ProductCategory>}
        productFilter={<ProductFilter></ProductFilter>}
        productList={<ProductList isProductPage={true} ></ProductList>}
        pagination={<Pagination isProductPage={true}></Pagination>}
      ></ProductContainer>
    </>
  );
}
