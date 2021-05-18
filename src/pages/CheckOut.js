import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import CheckOutProduct from "../components/CheckOutProduct";

export default function CheckOut() {
  const [isCheckOutPage, setIsCheckOutPage] = useState(false);

  useEffect(() => {
    // effect
    setIsCheckOutPage(true);
    return () => {
      // cleanup
    };
  }, []);
  return (
    <>
      <Header isCheckOutPage={isCheckOutPage}></Header>
      <CheckOutProduct></CheckOutProduct>
    </>
  );
}
