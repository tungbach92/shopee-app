import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import { useSearchParams } from "react-router-dom";
import ProductContainer from "../components/Product/ProductContainer";
import ProductProvider from "../ProductProvider";
import { useSearchContext } from "../context/SearchProvider";
const Search = () => {
  const { searchItems, setSearchInput } = useSearchContext();
  const [searchParams, setSearchParams] = useSearchParams();

  // useEffect(() => {
  //   setSearchParams({ keyword: searchInput }, { replace: true });
  // }, [searchInput, setSearchParams]);

  useEffect(() => {
    return () => {
      setSearchInput("");
    };
  }, [setSearchInput]);

  //TODO: use hooks or HOC, render children to wrap Header with UserProvider
  return (
    <>
      <ProductProvider>
          <Header></Header>
      </ProductProvider>
      <ProductContainer items={searchItems}></ProductContainer>
    </>
  );
};

export default Search;
