import React from "react";
import Header from "../components/Header/Header";
import LoginContent from "../components/LoginContent";
const Register = () => {
  return (
    <>
      <Header isRegisterPage={true} headerText="Đăng ký"></Header>
      <LoginContent isRegisterPage={true} submitText="Đăng ký"></LoginContent>
    </>
  );
};

export default Register;
