import React, { Component } from "react";
import Header from "../components/Header";
import HeaderSearch from "../components/HeaderSearch";
export default class SingleProduct extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Header>
          <HeaderSearch></HeaderSearch>
        </Header>
        Hello Single Product!
      </>
    );
  }
}
