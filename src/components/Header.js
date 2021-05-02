import React from "react";
import HeaderNav from "./HeaderNav";
import HeaderSearch from "./HeaderSearch";
import { ProductContext } from "../context";
import { useContext } from "react";

export default function Header() {
  const context = useContext(ProductContext);
  const {
    searchInput,
    filterProductBySearch,
    searchHistory,
    addToSearchHistory,
  } = context;
  return (
    <header className="header">
      <div className="grid grid--fullheight">
        <HeaderNav></HeaderNav>
        <HeaderSearch
          searchInput={searchInput}
          filterProductBySearch={filterProductBySearch}
          searchHistory={searchHistory}
          addToSearchHistory={addToSearchHistory}
        ></HeaderSearch>
      </div>
    </header>
  );
}
