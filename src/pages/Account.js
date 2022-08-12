//set up routing for Account feature
import React, { useContext } from "react";
import Header from "../components/Header/Header";
import { ProductContext } from "../context";
import AccountContent from "../components/AccountContent";
import { Navigate, useNavigate } from "react-router";

export default function Account() {
  const { authorized } = useContext(ProductContext);
  const navigate = useNavigate();
  if (!authorized) {
    // return <Navigate to="/login"></Navigate>;
    navigate("/login");
    return null;
  }
  return (
    <>
      <Header isAccountPage={true}></Header>
      <AccountContent></AccountContent>
    </>
  );
}
