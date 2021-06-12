import React from "react";
import Header from "../components/Header";
import HeaderSearch from "../components/HeaderSearch";
import DetailProduct from "../components/DetailProduct";
export default function Detail(props) {
  const { metaTitle } = props.match.params;
  return (
    <>
      <Header headerSearch={<HeaderSearch />}></Header>
      <DetailProduct metaTitle={metaTitle}></DetailProduct>
    </>
  );
}
