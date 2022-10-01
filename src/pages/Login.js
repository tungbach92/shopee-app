import React from "react";
import Header from "../components/Header/Header";
import LoginContainer from "../components/Login/LoginContainer";
import ProductsAndSearchProvider from "../context/ProductsAndSearchProvider";
const Login = () => {
  return (
    <>
      <ProductsAndSearchProvider>
        <Header headerText="Đăng nhập" isLoginPage={true}></Header>
      </ProductsAndSearchProvider>
      <LoginContainer
        submitText="Đăng nhập"
        isLoginPage={true}
      ></LoginContainer>
    </>
  );
};

export default Login;
