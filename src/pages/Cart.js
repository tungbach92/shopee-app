import React, { Component } from "react";
import Header from "../components/Header";
import CartProduct from "../components/CartProduct";
export default class Cart extends Component {
  state = {
    isCartPageLoaded: false,
  };

  componentDidMount = () => {
    this.setState({ isCartPageLoaded: true });
  };
  render() {
    return (
      <>
        <Header isCartPageLoaded={this.state.isCartPageLoaded}></Header>
        <CartProduct></CartProduct>
      </>
    );
  }
}
