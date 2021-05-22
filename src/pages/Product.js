import React from "react";
import ProductContainer from "../components/ProductContainer";
import Header from "../components/Header";
import HeaderSearch from "../components/HeaderSearch";
export default function Product() {
  return (
    <>
      <Header>
        <HeaderSearch></HeaderSearch>
      </Header>
      <ProductContainer></ProductContainer>
    </>
  );
}
