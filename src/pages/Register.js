import React from "react";
import Header from "../components/Header/Header";
import LoginContainer from "../components/Login/LoginContainer";
import ProductsAndSearchProvider from "../context/ProductsAndSearchProvider";
const Register = () => {
  return (
    <>
      <ProductsAndSearchProvider>
        <Header isRegisterPage={true} headerText="Đăng ký"></Header>
      </ProductsAndSearchProvider>
      <LoginContainer
        isRegisterPage={true}
        submitText="Đăng ký"
      ></LoginContainer>
    </>
  );
};

export default Register;
