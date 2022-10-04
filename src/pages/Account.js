//set up routing for Account feature
import React from "react";
import Header from "../components/Header/Header";
import AccountContainer from "../components/Account/AccountContainer";
import ProductProvider from "../ProductProvider";

export default function Account() {
  return (
    <>
      <ProductProvider>
        <Header isAccountPage={true}></Header>
      </ProductProvider>
      <AccountContainer></AccountContainer>
    </>
  );
}
