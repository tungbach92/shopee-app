import React from "react";
import Header from "../components/Header";
import LoginContent from "../components/LoginContent";
const Register = () => {

  return (
    <>
      <Header
        isRegisterPage ={true}
        headerText="Đăng ký"
      ></Header>
      <LoginContent submitText="Đăng ký"></LoginContent>
    </>
  );
};

export default Register;
