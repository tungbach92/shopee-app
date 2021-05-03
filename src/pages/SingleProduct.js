import React, { Component } from "react";
import Header from "../components/Header";
export default class SingleProduct extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Header></Header>
        Hello Single Product!
      </>
    );
  }
}
