import React from "react";
import Header from "../components/Header";
import HeaderSearch from "../components/HeaderSearch";
import HeaderNav from "../components/HeaderNav";
export default function Account() {
  return (
    <div>
      <Header
        headerNav={<HeaderNav></HeaderNav>}
        headerSearch={<HeaderSearch />}
      ></Header>
      Hello Account!
    </div>
  );
}
