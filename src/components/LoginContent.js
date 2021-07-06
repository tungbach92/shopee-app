import React, { useState } from "react";
import { Link } from "react-router-dom";
function LoginContent({ isLoginPage, isRegisterPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("log in");
  };
  const handleRegister = (e) => {
    e.preventDefault();
    console.log("register");
  };
  return (
    <div className="container container--login">
      <div className="grid grid--login">
        <div className="login-content__img">
          <form
            className="login-content__input"
            onSubmit={isLoginPage ? handleLogin : handleRegister}
          >
            <span className="login-content__title">Đăng nhập</span>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-content__email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-content__password"
              required
            />
            <button type="submit" className="btn login-content__submit">
              {isLoginPage && "Đăng nhập"}
              {isRegisterPage && "Đăng ký"}
            </button>
            {isRegisterPage && (
              <span className="login-content__rule">
                Bằng việc đăng kí, bạn đã đồng ý với Shopee về Điều khoản dịch
                vụ và Chính sách bảo mật
              </span>
            )}
            <span className="login-content__register-wrapper">
              {isLoginPage && (
                <>
                  Bạn mới biết đến Shopee?
                  <Link to="/register" className="login-content__register">
                    Đăng ký
                  </Link>
                </>
              )}
              {isRegisterPage && (
                <>
                  Bạn đã có tài khoản?
                  <Link to="/login" className="login-content__register">
                    Đăng nhập
                  </Link>
                </>
              )}
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginContent;
