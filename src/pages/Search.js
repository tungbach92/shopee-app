import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import ProductContainer from "../components/Product/ProductContainer";
import { useSearchContext } from "../context/SearchProvider";
const Search = () => {
  const { searchItems, setSearchInput } = useSearchContext();
  // const [searchParams, setSearchParams] = useSearchParams();

  // useEffect(() => {
  //   setSearchParams({ keyword: searchInput }, { replace: true });
  // }, [searchInput, setSearchParams]);

  useEffect(() => {
    return () => {
      setSearchInput("");
    };
  }, [setSearchInput]);

  return (
    <>
      <Header></Header>
      <ProductContainer items={searchItems}></ProductContainer>
    </>
  );
};

export default Search;
