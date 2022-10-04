import React from "react";
import CartContainer from "../components/Cart/CartContainer";
import Header from "../components/Header/Header";
import ProductProvider from "../ProductProvider";

export default function Cart() {
  return (
    <>
      <ProductProvider>
        <Header isCartPage={true}></Header>
      </ProductProvider>
      <CartContainer isCartPage={true}></CartContainer>
    </>
  );
}
