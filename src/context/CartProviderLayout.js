import React from "react";
import { Outlet } from "react-router-dom";
import CartProvider from "./CartProvider";

const CartProviderLayout = () => {
  return (
    <CartProvider>
      <Outlet />
    </CartProvider>
  );
};

export default CartProviderLayout;
