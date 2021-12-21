//set up routing for Account feature
import React, { useContext } from "react";
import Header from "../../components/Header";
import HeaderSearch from "../../components/HeaderSearch";
import HeaderNav from "../../components/HeaderNav";
import { ProductContext } from "../../context";
import AccountContent from "./components/AccountContent";
import { Redirect } from "react-router";

export default function Account() {
  const { authorized, searchInput, searchHistory, addToSearchHistory } =
    useContext(ProductContext);

  if (authorized !== null) {
    if (!authorized) {
      return <Redirect to="/login"></Redirect>;
    }
    return (
      <>
        <Header
          isAccountPage={true}
          headerNav={<HeaderNav></HeaderNav>}
          headerSearch={
            <HeaderSearch
              searchInput={searchInput}
              searchHistory={searchHistory}
              addToSearchHistory={addToSearchHistory}
            ></HeaderSearch>
          }
        ></Header>
        <AccountContent></AccountContent>
      </>
    );
  } else
    return (
      <Header
        isAccountPage={true}
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
