import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import HeaderSearch from "../components/HeaderSearch";
import HeaderNav from "../components/HeaderNav";
import { ProductContext } from "../context";
import HeaderContent from "../components/HeaderContent";

export default function Account() {
  const [isAccountPage, setIsAccountPage] = useState(false);
  const {
    searchInput,
    filterProductBySearch,
    searchHistory,
    addToSearchHistory,
  } = useContext(ProductContext);

  useEffect(() => {
    setIsAccountPage(true);
  }, []);
  return (
    <>
      <Header
        isAccountPage={isAccountPage}
        headerNav={<HeaderNav></HeaderNav>}
        headerSearch={
          <HeaderSearch
            searchInput={searchInput}
            filterProductBySearch={filterProductBySearch}
            searchHistory={searchHistory}
            addToSearchHistory={addToSearchHistory}
          ></HeaderSearch>
        }
      ></Header>
      <HeaderContent></HeaderContent>
    </>
  );
}
