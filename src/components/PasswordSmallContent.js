import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "../context";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import useModal from "../hooks/useModal";
import PopupModal from "./PopupModal";
import PasswordResetModal from "./PasswordResetModal";

function PasswordSmallContent({ setEmail, email }) {
  const { user } = useContext(ProductContext);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isUpdatingPasswordProcess, setIsUpdatingPasswordProcess] =
    useState(false);
  const [isUpdatePasswordSuccess, setIsUpdatePasswordSuccess] = useState(false);
  const {
    isPopupShowing,
    togglePopup,
    isPasswordResetShowing,
    togglePasswordReset,
  } = useModal();

  useEffect(() => {
    if (user) {
      const email = user.email;
      setEmail(email);
    }
  }, [setEmail, user]);

  const handleForgotPasswordClick = () => {
    togglePasswordReset(!isPasswordResetShowing);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setNewPassword("");
      setConfirmPassword("");
      updatePassword();
    }
  };
  const updatePassword = () => {
    setIsUpdatingPasswordProcess(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        userCredential.user
          .updatePassword(newPassword)
          .then(() => {
            setIsUpdatingPasswordProcess(false);
            togglePopup(!isPopupShowing);
            setIsUpdatePasswordSuccess(true);
            console.log("update password successfully");
          })
          .catch((err) => {
            setIsUpdatingPasswordProcess(false);
            setIsUpdatePasswordSuccess(false);
            console.log(err);
          });
      })
      .catch((err) => {
        let errors = {};
        errors["password"] = "Password incorrect";
        setErrors(errors);
        setIsUpdatingPasswordProcess(false);
        setIsUpdatePasswordSuccess(false);
        console.log(err);
      });
  };

  const validate = () => {
    let isValid = true;
    let errors = {};

    if (!password) {
      isValid = false;
      errors["password"] = "Please enter your password";
    }

    if (!newPassword) {
      isValid = false;
      errors["newPassword"] = "Please enter new password";
    } else if (!confirmPassword) {
      isValid = false;
      errors["confirmPassword"] = "Please enter confirm password";
    } else if (confirmPassword.length < 6 || newPassword.length < 6) {
      isValid = false;
      errors["newPassword"] = "Password should be at least 6 characters";
    }

    if (
      typeof newPassword !== "undefined" &&
      typeof confirmPassword !== "undefined"
    ) {
      if (newPassword !== confirmPassword) {
        isValid = false;
        errors["newPassword"] = "Passwords doesn't match";
      }
    }
    setErrors(errors);
    return isValid;
  };
  return (
    <>
      <div className="user-profile__title-container">
        <div className="user-profile__title">
          <div className="user-profile__label">Đổi Mật Khẩu</div>
          <div className="user-profile__label-detail">
            Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
          </div>
        </div>
      </div>
      <div className="user-profile__password-content">
        <form
          onSubmit={isUpdatingPasswordProcess ? undefined : handleSubmit}
          className="user-profile__password-form"
        >
          <label className="user-profile__oldpassword-label">
            Mật khẩu hiện tại:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="user-profile__oldpassword-input"
          />
          <div className="user-profile__password-error">{errors.password}</div>

          <div
            onClick={handleForgotPasswordClick}
            className="user-profile__forgot-password"
          >
            Quên mật khẩu?
          </div>
          <PasswordResetModal
            setEmail={setEmail}
            email={email}
            isPasswordResetShowing={isPasswordResetShowing}
            togglePasswordReset={togglePasswordReset}
          ></PasswordResetModal>
          <label className="user-profile__newpassword-label">
            Mật Khẩu Mới:
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="user-profile__newpassword-input"
          />
          <label className="user-profile__confirmPassword-label">
            Xác Nhận Mật Khẩu:
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="user-profile__confirmPassword-input"
          />

          <div className="user-profile__newPassword-error">
            {errors.newPassword}
          </div>
          <button
            disabled={isUpdatingPasswordProcess}
            type="submit"
            className="btn user-profile__password-btn"
          >
            {isUpdatingPasswordProcess ? "Xử lý..." : "Xác nhận"}
          </button>
        </form>
        {isPopupShowing && (
          <PopupModal
            isAccountPage={true}
            isUpdatePasswordSuccess={isUpdatePasswordSuccess}
            isPopupShowing={isPopupShowing}
            togglePopup={togglePopup}
          ></PopupModal>
        )}
      </div>
    </>
  );
}

export default PasswordSmallContent;
