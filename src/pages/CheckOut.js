import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import CheckoutProduct from "../components/CheckoutProduct";
import HeaderSearch from "../components/HeaderSearch";
import HeaderNav from "../components/HeaderNav";
import { ProductContext } from "../context";
import { Redirect } from "react-router";

export default function Checkout() {
  const [isCheckoutPage, setIsCheckoutPage] = useState(false);
  const { authorized } = useContext(ProductContext);



  useEffect(() => {
    // effect
    setIsCheckoutPage(true);
    return () => {
      // cleanup
    };
  }, []);

  if(authorized !== null) { 
    if (!authorized) {
      return <Redirect to="/login"></Redirect>;
    }
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
  else return null;
 
}
