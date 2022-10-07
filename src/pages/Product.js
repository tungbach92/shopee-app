import React from "react";
import Header from "../components/Header/Header";
import ProductContainer from "../components/Product/ProductContainer";
import { useProductsContext } from "../context/ProductsProvider";

export default function Product() {
  // const { setSearchInput } = useProduct();
  const { items } = useProductsContext();

  return (
    <>
      <Header isProductPage={true}></Header>
      <ProductContainer items={items}></ProductContainer>
    </>
  );
}
