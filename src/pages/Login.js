import React from "react";
import Header from "../components/Header/Header";
import LoginContainer from "../components/Login/LoginContainer";
import SearchProvider from "../context/SearchProvider";
const Login = () => {
  return (
    <>
      <SearchProvider>
        <Header headerText="Đăng nhập" isLoginPage={true}></Header>
      </SearchProvider>
      <LoginContainer
        submitText="Đăng nhập"
        isLoginPage={true}
      ></LoginContainer>
    </>
  );
};

export default Login;
