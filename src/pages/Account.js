//set up routing for Account feature
import React from "react";
import Header from "../components/Header/Header";
import { useProduct } from "../context";
import AccountContent from "../components/AccountContent";
import { Navigate } from "react-router";

export default function Account() {
  const { authorized } = useProduct();
  if (authorized !== null) {
    if (!authorized) {
      return <Navigate to="/login"></Navigate>;
    }
    return (
      <>
        <Header isAccountPage={true}></Header>
        <AccountContent></AccountContent>
      </>
    );
  } else return null;
}
