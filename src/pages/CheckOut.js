import React, { useContext } from "react";
import Header from "../components/Header/Header";
import CheckoutProduct from "../components/CheckoutProduct";
import { ProductContext } from "../context";
import { Navigate } from "react-router";

export default function Checkout() {
  const { authorized } = useContext(ProductContext);

  if (authorized !== null) {
    if (!authorized) {
      return <Navigate to="/login"></Navigate>;
    }
    return (
      <>
        <Header isCheckoutPage={true}></Header>
        <CheckoutProduct isCheckoutPage={true}></CheckoutProduct>
      </>
    );
  } else return null;
}
