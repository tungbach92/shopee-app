import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { db, auth } from "../firebase";
function LoginContent({ isLoginPage, submitText }) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential);
        history.push("/");
      })
      .catch((error) => alert(error));
    console.log("log in");
  };
  const handleRegister = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential);
        if (userCredential) {
          //create account success
          const user = userCredential.user;
          const randomName = Math.random().toString(36).substring(2);

          user
            .updateProfile({
              displayName: randomName,
            })
            .then(() => {
              history.push("/");
            });
        }
      })
      .catch((error) => alert(error.message));
    console.log("register");
  };
  return (
    <div className="main main--login">
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
              {submitText}
            </button>
            {!isLoginPage && (
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
              {!isLoginPage && (
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
