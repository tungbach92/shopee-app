import React from "react";
import Header from "../components/Header/Header";
import ProductContainer from "../components/Product/ProductContainer";
import { useProductsAndSearch } from "../context/ProductsAndSearchProvider";
import UserProvider from "../context/UserProvider";
import ProductProvider from "../ProductProvider";

export default function Product() {
  // const { setSearchInput } = useProduct();
  const { items } = useProductsAndSearch();

  return (
    <>
      <ProductProvider>
          <Header></Header>
      </ProductProvider>
      <ProductContainer items={items}></ProductContainer>
    </>
  );
}
