import React from "react";
import Header from "../components/Header";
import HeaderSearch from "../components/HeaderSearch";
import DetailProduct from "../components/DetailProduct";
export default function Detail() {
  return (
    <>
      <Header headerSearch={<HeaderSearch />}></Header>
      <DetailProduct></DetailProduct>
    </>
  );
}
