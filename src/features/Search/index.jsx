import React from "react";
import ProductFilter from "../../components/ProductFilter";
import ProductList from "../../components/ProductList";
import Pagination from "../../components/Pagination";
import Header from "../../components/Header";
const Search = () => {
  return (
    <>
      <Header isSearchPage={true}></Header>
      <div className="grid">
        <div className="grid__row grid__row--padtb3">
          <div className="grid__col-12x">
            <ProductFilter isSearchPage={true}></ProductFilter>
            <div className="grid__row grid__row-product">
              <ProductList isSearchPage={true}></ProductList>
            </div>
            <Pagination isSearchPage={true}></Pagination>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
