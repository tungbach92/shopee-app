import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import HeaderSimpleContent from "../components/HeaderSimpleContent";
import LoginContent from "../components/LoginContent";
const Login = () => {
  const [isLoginPage, setIsLoginPage] = useState(false);

  useEffect(() => {
    setIsLoginPage(true);
  }, []);

  return (
    <>
      <Header
        isLoginPage={isLoginPage}
        headerSimpleContent={
          <HeaderSimpleContent isLoginPage={isLoginPage}></HeaderSimpleContent>
        }
      ></Header>
      <LoginContent isLoginPage={isLoginPage}></LoginContent>
    </>
  );
};

export default Login;
