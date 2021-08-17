import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import HeaderSearch from "../components/HeaderSearch";
import HeaderNav from "../components/HeaderNav";
import { ProductContext } from "../context";
import AccountContent from "../components/AccountContent";

const Email = () => {
  const [isEmailPage, setIsEmailPage] = useState(false);
  const {
    searchInput,
    filterProductBySearch,
    searchHistory,
    addToSearchHistory,
  } = useContext(ProductContext);

  useEffect(() => {
    setIsEmailPage(true);
  }, []);

  return (
    <>
      <Header
        isEmailPage={isEmailPage}
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
      <AccountContent isEmailPage={isEmailPage}></AccountContent>
    </>
  );
};

export default Email;
