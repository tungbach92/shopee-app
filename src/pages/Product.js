import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import ProductContent from "../components/ProductContent";
import { useProduct } from "../context";

export default function Product() {
  const { setSearchInput } = useProduct();

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
