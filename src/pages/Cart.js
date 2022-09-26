import React from "react";
import CartContainer from "../components/Cart/CartContainer";
import { useProduct } from "../ProductProvider";
import { Navigate } from "react-router";
import Header from "../components/Header/Header";

export default function Cart() {
  const { authorized } = useProduct();

  if (authorized !== null) {
    if (!authorized) {
      return <Navigate to="/login"></Navigate>;
    } else
      return (
        <>
          <Header isCartPage={true}></Header>
          <CartContainer isCartPage={true}></CartContainer>
        </>
      );
  } else return null;
}
