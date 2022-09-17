import React, { useContext, useEffect } from "react";
import Header from "../components/Header/Header";
import { ProductContext } from "../context";
import { useSearchParams } from "react-router-dom";
import ProductContent from "../components/ProductContent";
const Search = () => {
  const { searchInput } = useContext(ProductContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get("keyword");

  useEffect(() => {
    setSearchParams({ keyword: searchInput }, { replace: true });
  }, [searchInput, setSearchParams]);

  return (
    <>
      <Header isSearchPage={true}></Header>
      <ProductContent isSearchPage={true}></ProductContent>
    </>
  );
};

export default Search;
