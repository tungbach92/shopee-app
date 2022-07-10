import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import DetailProduct from "../components/DetailProduct";
export default function Detail(props) {
  // const { metaTitle } = props.match.params;
  const { metaTitle } = useParams();
  return (
    <>
      <Header></Header>
      <DetailProduct metaTitle={metaTitle}></DetailProduct>
    </>
  );
}
