import React, { useContext, useState, useEffect } from "react";
import Header from "../components/Header";
import CartProduct from "../components/CartProduct";
import HeaderSearch from "../components/HeaderSearch";
import HeaderNav from "../components/HeaderNav";
import { ProductContext } from "../context";
import { Redirect } from "react-router";

export default function Cart() {
  const [isCartPageLoaded, setIsCartPageLoaded] = useState(false);
  const { authorized } = useContext(ProductContext);

  useEffect(() => {
    // effect
    setIsCartPageLoaded(true);
    return () => {
      // cleanup
    };
  }, []);

  if (authorized !== null) {
    if (!authorized) {
      return <Redirect to="/login"></Redirect>;
    } else
      return (
        <>
          <Header
            headerNav={<HeaderNav></HeaderNav>}
            headerSearch={
              <HeaderSearch isCartPageLoaded={isCartPageLoaded}></HeaderSearch>
            }
          ></Header>
          <CartProduct isCartPageLoaded={isCartPageLoaded}></CartProduct>
        </>
      );
  } else return null;
}
