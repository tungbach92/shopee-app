import React from "react";
import { Link } from "react-router-dom";
function LoginContent() {
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("log in");
  };
  return (
    <div className="container container--login">
      <div className="grid grid--login">
        <div className="login-content__img">
          <form className="login-content__input" onSubmit={handleLogin}>
            <span className="login-content-title">Đăng nhập</span>
            <label className="login-content__email-label">Email</label>
            <input type="text" className="login-content__email" required />
            <label className="login-content__password-label">Mật khẩu</label>
            <input
              type="password"
              className="login-content__password"
              required
            />
            <button type="submit" className="btn login-content__submit">
              Đăng nhập
            </button>
            <span className="login-content__register-wrapper">
              Bạn mới biết đến Shopee?
              <Link to="/register" className="login-content__register">
                Đăng ký
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginContent;
