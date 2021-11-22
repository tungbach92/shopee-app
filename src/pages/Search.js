import React from "react";
import ProductContainer from "../components/ProductContainer";
import ProductFilter from "../components/ProductFilter";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import Header from "../components/Header"
const Search = () => {

  return (
    <>
      <Header
        isSearchPage={true}
      ></Header>
      <ProductContainer
        isSearchPage={true}
        productFilter={<ProductFilter isSearchPage={true}></ProductFilter>}
        productList={<ProductList isSearchPage={true} ></ProductList>}
        pagination={<Pagination isSearchPage={true}></Pagination>}
      ></ProductContainer>
    </>
  );
};

export default Search;
