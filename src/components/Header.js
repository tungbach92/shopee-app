import React from "react";
import HeaderNav from "./HeaderNav";

export default function Header({
  isCheckoutPage,
  isCartPageLoaded,
  headerSearch,
}) {
  return (
    <header
      className={
        isCartPageLoaded || isCheckoutPage ? "header header--support" : "header"
      }
    >
      <div className="grid grid--fullheight">
        <HeaderNav></HeaderNav>
        {headerSearch}
      </div>
    </header>
  );
}
