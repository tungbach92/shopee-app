import React, { useContext, useEffect } from "react";
import Header from "../components/Header/Header";
import ProductContent from "../components/ProductContent";
import { ProductContext } from "../context";

export default function Product() {
  const { setSearchInput } = useContext(ProductContext);

  useEffect(() => {
    setSearchInput("");
  }, [setSearchInput]);

  return (
    <>
      <Header isProductPage={true}></Header>
      <ProductContent isProductPage={true}></ProductContent>
    </>
  );
}
