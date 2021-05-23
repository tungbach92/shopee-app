import React, { Component } from "react";
import Header from "../components/Header";
import CartProduct from "../components/CartProduct";
import HeaderSearch from "../components/HeaderSearch";
import { ProductContext } from "../context";
export default class Cart extends Component {
  static contextType = ProductContext;
  state = {
    isCartPageLoaded: false,
  };

  componentDidMount = () => {
    this.setState({ isCartPageLoaded: true });
  };
  render() {
    const {
      searchInput,
      filterProductBySearch,
      searchHistory,
      addToSearchHistory,
    } = this.context;
    return (
      <>
        <Header
          headerSearch={
            <HeaderSearch
              searchInput={searchInput}
              filterProductBySearch={filterProductBySearch}
              searchHistory={searchHistory}
              addToSearchHistory={addToSearchHistory}
              isCartPageLoaded={this.state.isCartPageLoaded}
            ></HeaderSearch>
          }
        ></Header>
        <CartProduct></CartProduct>
      </>
    );
  }
}
