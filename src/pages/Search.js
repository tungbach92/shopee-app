import React, { useContext, useState, useEffect } from "react";
import Header from "../components/Header";
import HeaderSearch from "../components/HeaderSearch";
import HeaderNav from "../components/HeaderNav";
import ProductContainer from "../components/ProductContainer";
import { ProductContext } from "../context";
const Search = () => {
  const [isSearchPage, setIsSearchPage] = useState(false);

  useEffect(() => {
    setIsSearchPage(true);
  }, []);

  return (
    <>
      <Header
        isSearchPage={isSearchPage}
        headerNav={<HeaderNav></HeaderNav>}
        headerSearch={
          <HeaderSearch
            isSearchPage={isSearchPage}
          ></HeaderSearch>
        }
      ></Header>
      <ProductContainer isSearchPage={isSearchPage}></ProductContainer>
    </>
  );
};

export default Search;
