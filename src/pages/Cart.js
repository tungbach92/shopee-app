import React, { Component } from "react";
import Header from "../components/Header";
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
        Hello Cart!
      </>
    );
  }
}
