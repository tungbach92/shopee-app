import React, { useContext } from "react";
import CartProduct from "../components/CartProduct";
import { ProductContext } from "../context";
import { Navigate } from "react-router";
import Header from "../components/Header/Header";

export default function Cart() {
  const { authorized } = useContext(ProductContext);

  if (authorized !== null) {
    if (!authorized) {
      return <Navigate to="/login"></Navigate>;
    } else
      return (
        <>
          <Header isCartPage={true}></Header>
          <CartProduct isCartPage={true}></CartProduct>
        </>
      );
  } else return null;
}
