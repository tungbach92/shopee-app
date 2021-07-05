import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import HeaderSearch from "../components/HeaderSearch";
import HeaderNav from "../components/HeaderNav";
import DetailProduct from "../components/DetailProduct";
export default function Detail(props) {
  // const { metaTitle } = props.match.params;
  const { metaTitle } = useParams();
  return (
    <>
      <Header
        headerNav={<HeaderNav></HeaderNav>}
        headerSearch={<HeaderSearch />}
      ></Header>
      <DetailProduct metaTitle={metaTitle}></DetailProduct>
    </>
  );
}
