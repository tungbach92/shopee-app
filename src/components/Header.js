import React from "react";
import HeaderNav from "./HeaderNav";

export default function Header({ isCartPageLoaded, headerSearch }) {
  return (
    <header className={isCartPageLoaded ? "header header--cart" : "header"}>
      <div className="grid grid--fullheight">
        <HeaderNav></HeaderNav>
        {headerSearch}
      </div>
    </header>
  );
}
