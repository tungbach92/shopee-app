import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import ProductContent from "../components/Product/ProductContent";
import { useProduct } from "../ProductProvider";

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
