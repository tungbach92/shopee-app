import React, { useContext } from "react";
import Header from "../components/Header/Header";
import CheckoutProduct from "../components/CheckoutProduct";
import { ProductContext } from "../context";
import { Redirect } from "react-router";

export default function Checkout() {
  const { authorized } = useContext(ProductContext);

  if (authorized !== null) {
    if (!authorized) {
      return <Redirect to="/login"></Redirect>;
    }
    return (
      <>
        <Header isCheckoutPage={true}></Header>
        <CheckoutProduct></CheckoutProduct>
      </>
    );
  } else return null;
}
