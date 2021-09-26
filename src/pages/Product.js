import React, { useContext, useEffect, useState } from "react";
import ProductContainer from "../components/ProductContainer";
import Header from "../components/Header";
import HeaderSearch from "../components/HeaderSearch";
import HeaderNav from "../components/HeaderNav";
import { ProductContext } from "../context";
export default function Product() {
  const context = useContext(ProductContext);
  const [isProductPage, SetIsProductPage] = useState(false);

  useEffect(() => {
    SetIsProductPage(true);
  }, []);

  return (
    <>
      <Header
        isProductPage={isProductPage}
        headerNav={<HeaderNav></HeaderNav>}
        headerSearch={<HeaderSearch></HeaderSearch>}
      ></Header>
      <ProductContainer isProductPage={isProductPage}></ProductContainer>
    </>
  );
}
