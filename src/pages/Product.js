import React from "react";
import Header from "../components/Header/Header";
import ProductContainer from "../components/Product/ProductContainer";
import { useProductsContext } from "../context/ProductsProvider";
import UserProvider from "../context/UserProvider";
import ProductProvider from "../ProductProvider";

export default function Product() {
  // const { setSearchInput } = useProduct();
  const { items } = useProductsContext();

  return (
    <>
      <ProductProvider>
        <Header isProductPage={true}></Header>
      </ProductProvider>
      <ProductContainer items={items}></ProductContainer>
    </>
  );
}
