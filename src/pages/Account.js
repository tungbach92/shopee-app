import React from "react";
import Header from "../components/Header";
import HeaderSearch from "../components/HeaderSearch";
export default function Account() {
  return (
    <div>
      <Header headerSearch={<HeaderSearch />}></Header>
      Hello Account!
    </div>
  );
}
