//set up routing for Account feature
import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import AccountContainer from "../components/Account/AccountContainer";
import { useNavigate } from "react-router";
import { useUser } from "../context/UserProvider";
import ProductsAndSearchProvider from "../context/ProductsAndSearchProvider";
import ProductProvider from "../ProductProvider";
import { ClipLoading } from "../components/ClipLoading";

export default function Account() {
  const { user, userLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !userLoading) {
      navigate("/login");
    }
  }, [navigate, user, userLoading]);

  if (userLoading) {
    <ClipLoading></ClipLoading>;
  }
  return (
    <>
      <ProductsAndSearchProvider>
        <ProductProvider>
          <Header isAccountPage={true}></Header>
        </ProductProvider>
      </ProductsAndSearchProvider>
      <AccountContainer></AccountContainer>
    </>
  );
}
