import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import CheckoutProduct from "../components/CheckoutProduct";

export default function Checkout() {
  const [isCheckoutPage, setIsCheckoutPage] = useState(false);

  useEffect(() => {
    // effect
    setIsCheckoutPage(true);
    return () => {
      // cleanup
    };
  }, []);
  return (
    <>
      <Header isCheckoutPage={isCheckoutPage}></Header>
      <CheckoutProduct></CheckoutProduct>
    </>
  );
}
