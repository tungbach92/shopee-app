import React from "react";
import Header from "../components/Header/Header";
import CheckoutContainer from "../components/Checkout/CheckoutContainer";
import { useProduct } from "../ProductProvider";
import { Navigate } from "react-router";

export default function Checkout() {
  const { authorized } = useProduct();
  if (authorized !== null) {
    if (!authorized) {
      return <Navigate to="/login"></Navigate>;
    }
    return (
      <>
        <Header isCheckoutPage={true}></Header>
        <CheckoutContainer isCheckoutPage={true}></CheckoutContainer>
      </>
    );
  } else return null;
}
