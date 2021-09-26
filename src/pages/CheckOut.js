import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import CheckoutProduct from "../components/CheckoutProduct";
import HeaderSearch from "../components/HeaderSearch";
import HeaderNav from "../components/HeaderNav";
import { ProductContext } from "../context";
export default function Checkout() {
  const [isCheckoutPage, setIsCheckoutPage] = useState(false);
  const context = useContext(ProductContext);
  const {
    searchInput,
    searchHistory,
    addToSearchHistory,
  } = context;

  useEffect(() => {
    // effect
    setIsCheckoutPage(true);
    return () => {
      // cleanup
    };
  }, []);
  return (
    <>
      <Header
      headerClass="header--checkout"
        headerNav={<HeaderNav></HeaderNav>}
        headerSearch={
          <HeaderSearch
            isCheckoutPage={isCheckoutPage}
          ></HeaderSearch>
        }
      ></Header>
      <CheckoutProduct></CheckoutProduct>
    </>
  );
}
