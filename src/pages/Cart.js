import React, { Component } from "react";
import Header from "../components/Header";
import CartProduct from "../components/CartProduct";
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
      cartItems,
      handleClick,
      changeVariationDisPlayCartItems,
      changeSimilarDisPlayCartItems,
    } = this.context;
    return (
      <>
        <Header isCartPageLoaded={this.state.isCartPageLoaded}></Header>
        <CartProduct
          changeSimilarDisPlayCartItems={changeSimilarDisPlayCartItems}
          changeVariationDisPlayCartItems={changeVariationDisPlayCartItems}
          cartItems={cartItems}
          handleClick={handleClick}
        ></CartProduct>
      </>
    );
  }
}
