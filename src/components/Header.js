import React from "react";
import HeaderNav from "./HeaderNav";
import HeaderSearch from "./HeaderSearch";
import { ProductContext } from "../context";
import { useContext } from "react";

export default function Header(props) {
  const context = useContext(ProductContext);
  const {
    searchInput,
    filterProductBySearch,
    searchHistory,
    addToSearchHistory,
  } = context;
  const { isCartPageLoaded, isCheckOutPage } = props;
  return (
    <header className="header">
      <div className="grid grid--fullheight">
        <HeaderNav></HeaderNav>
        <HeaderSearch
          searchInput={searchInput}
          filterProductBySearch={filterProductBySearch}
          searchHistory={searchHistory}
          addToSearchHistory={addToSearchHistory}
          isCartPageLoaded={isCartPageLoaded}
          isCheckOutPage={isCheckOutPage}
        ></HeaderSearch>
      </div>
    </header>
  );
}
