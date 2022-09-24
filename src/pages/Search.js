import React, {  useEffect } from "react";
import Header from "../components/Header/Header";
import { useProduct } from "../context";
import { useSearchParams } from "react-router-dom";
import ProductContent from "../components/ProductContent";
const Search = () => {
  const { searchInput } = useProduct();
  const [searchParams, setSearchParams] = useSearchParams();

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
