import React, { useContext } from "react";
import CartProduct from "../components/CartProduct";
import { ProductContext } from "../context";
import { Redirect } from "react-router";
import Header from "../components/Header";

export default function Cart() {
  const { authorized } = useContext(ProductContext);

  if (authorized !== null) {
    if (!authorized) {
      return <Redirect to="/login"></Redirect>;
    } else
      return (
        <>
          <Header isCartPageLoaded={true}></Header>
          <CartProduct isCartPageLoaded={true}></CartProduct>
        </>
      );
  } else return null;
}
