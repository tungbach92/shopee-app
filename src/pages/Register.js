import React from "react";
import Header from "../components/Header/Header";
import LoginContainer from "../components/Login/LoginContainer";
import SearchProvider from "../context/SearchProvider";
const Register = () => {
  return (
    <>
      <SearchProvider>
        <Header isRegisterPage={true} headerText="Đăng ký"></Header>
      </SearchProvider>
      <LoginContainer
        isRegisterPage={true}
        submitText="Đăng ký"
      ></LoginContainer>
    </>
  );
};

export default Register;
