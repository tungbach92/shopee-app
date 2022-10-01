import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import { useSearchParams } from "react-router-dom";
import ProductContainer from "../components/Product/ProductContainer";
import { useProductsAndSearch } from "../context/ProductsAndSearchProvider";
import ProductProvider from "../ProductProvider";
import UserProvider from "../context/UserProvider";
const Search = () => {
  // const { searchInput } = useProduct();
  const { searchItems, setSearchInput } = useProductsAndSearch();
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
        <UserProvider>
          <Header></Header>
        </UserProvider>
      </ProductProvider>
      <ProductContainer items={searchItems}></ProductContainer>
    </>
  );
};

export default Search;
