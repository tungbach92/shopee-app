import React, { useContext, useState, useEffect } from "react";
import Header from "../components/Header";
import HeaderSearch from "../components/HeaderSearch";
import HeaderNav from "../components/HeaderNav";
import ProductContainer from "../components/ProductContainer";
import { ProductContext } from "../context";
const Search = () => {
  const [isSearchPage, setIsSearchPage] = useState(false);

  const {
    searchInput,
    filterProductBySearch,
    searchHistory,
    addToSearchHistory,
  } = useContext(ProductContext);

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
            searchInput={searchInput}
            filterProductBySearch={filterProductBySearch}
            searchHistory={searchHistory}
            addToSearchHistory={addToSearchHistory}
          ></HeaderSearch>
        }
      ></Header>
      <ProductContainer isSearchPage={isSearchPage}></ProductContainer>
    </>
  );
};

export default Search;
