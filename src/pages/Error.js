import React from "react";
import Header from "../components/Header";
import HeaderSearch from "../components/HeaderSearch";
export default function Error() {
  return (
    <>
      <Header headerSearch={<HeaderSearch />}>
      </Header>
      Hello Error!
    </>
  );
}
