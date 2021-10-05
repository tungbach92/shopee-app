import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import HeaderSearch from "../components/HeaderSearch";
import HeaderNav from "../components/HeaderNav";
import { ProductContext } from "../context";
import AccountContent from "../components/AccountContent";
import { Redirect } from "react-router";

export default function Account() {
  const [isAccountPage, setIsAccountPage] = useState(false);
  const { authorized, searchInput, searchHistory, addToSearchHistory } =
    useContext(ProductContext);

  useEffect(() => {
    setIsAccountPage(true);
  }, []);

  if (authorized !== null) {
    if (!authorized) {
      return <Redirect to="/login"></Redirect>;
    }
    return (
      <>
        <Header
          isAccountPage={isAccountPage}
          headerNav={<HeaderNav></HeaderNav>}
          headerSearch={
            <HeaderSearch
              searchInput={searchInput}
              searchHistory={searchHistory}
              addToSearchHistory={addToSearchHistory}
            ></HeaderSearch>
          }
        ></Header>
        <AccountContent isAccountPage={isAccountPage}></AccountContent>
      </>
    );
  } else
    return (
      <Header
        isAccountPage={isAccountPage}
        headerNav={<HeaderNav></HeaderNav>}
        headerSearch={
          <HeaderSearch
            searchInput={searchInput}
            searchHistory={searchHistory}
            addToSearchHistory={addToSearchHistory}
          ></HeaderSearch>
        }
      ></Header>
    );
}
