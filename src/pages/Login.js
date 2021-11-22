import React from "react";
import Header from "../components/Header";
import LoginContent from "../components/LoginContent";
const Login = () => {

  return (
    <>
      <Header
        headerText="Đăng nhập"
        isLoginPage={true}
      ></Header>
      <LoginContent submitText="Đăng nhập" isLoginPage={true}></LoginContent>
    </>
  );
};

export default Login;
