import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import HeaderSimpleContent from "../components/HeaderSimpleContent";
import LoginContent from "../components/LoginContent";
const Register = () => {

  return (
    <>
      <Header
        headerClass="header--login"
        headerSimpleContent={
          <HeaderSimpleContent
           headerText="Đăng ký"
          ></HeaderSimpleContent>
        }
      ></Header>
      <LoginContent submitText="Đăng ký"></LoginContent>
    </>
  );
};

export default Register;
