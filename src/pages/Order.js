import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import HeaderNav from "../components/HeaderNav";
import HeaderSearch from "../components/HeaderSearch";
import { ProductContext } from "../context";
import OrderContent from "../components/OrderContent";
const Order = () => {
  const [isOrderPage, setIsOrderPage] = useState(false);
  useEffect(() => {
    setIsOrderPage(true);
  }, []);
  return (
    <>
      <Header
        isOrderPage={isOrderPage}
        headerNav={<HeaderNav></HeaderNav>}
        headerSearch={<HeaderSearch></HeaderSearch>}
      ></Header>
      <OrderContent></OrderContent>
    </>
  );
};

export default Order;
