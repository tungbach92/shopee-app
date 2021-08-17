import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context";
import { auth } from "../firebase";
import useModal from "../hooks/useModal";
import PopupModal from "./PopupModal";

const EmailSmallContent = ({ isAccountPage, setEmail, email }) => {
  const { user } = useContext(ProductContext);
  const [verifyPassword, setVerifyPassword] = useState();
  const [isWrongPassword, setIsWrongPassword] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [isCheckSignInProcess, setIsCheckSignInProcess] = useState(false);
  const [isUpdatingEmailProcess, setIsUpdatingEmailProcess] = useState(false);
  const [isCredentialsValid, setIsCredentialsValid] = useState(false);
  const [isUpdateEmailSuccess, setIsUpdateEmailSuccess] = useState(false);

  const { isPopupShowing, togglePopup } = useModal();
  useEffect(() => {
    if (user) {
      const email = user.email;
      setEmail(email);
    }
  }, [setEmail, user]);

  const checkSignIn = () => {
    setIsCheckSignInProcess(true);
    auth
      .signInWithEmailAndPassword(email, verifyPassword)
      .then((userCredential) => {
        if (userCredential) {
          setIsCredentialsValid(true);
          setIsCheckSignInProcess(false);
        }
      })
      .catch((err) => {
        setIsCredentialsValid(false);
        setIsCheckSignInProcess(false);
        setIsWrongPassword(true);
        console.log(err);
      });
  };

  const updateEmail = () => {
    setIsUpdatingEmailProcess(true);
    auth
      .signInWithEmailAndPassword(email, verifyPassword)
      .then((userCredential) => {
        setIsCredentialsValid(true);
        userCredential.user
          .updateEmail(newEmail)
          .then(() => {
            togglePopup(!isPopupShowing);
            setIsUpdateEmailSuccess(true);
            setEmail(newEmail);
            setNewEmail("");
            setIsUpdatingEmailProcess(false);
            //success
          })
          .catch((err) => {
            togglePopup(!isPopupShowing);
            setNewEmail("");
            setIsUpdatingEmailProcess(false);
            console.log(err);
          });
      })
      .catch((err) => {
        setIsUpdatingEmailProcess(false);
        setIsCredentialsValid(false);
        setIsWrongPassword(true);
        console.log(err);
      });
  };

  const handleInputPwdKeyUp = (e) => {
    if (e.keyCode === 13) {
      checkSignIn(verifyPassword);
    }
  };
  const handleClick = () => {
    if (isCredentialsValid) {
      updateEmail(newEmail, verifyPassword);
    } else {
      checkSignIn(verifyPassword);
    }
  };
  return (
    <>
      <div className="email-profile__content">
        {email && (
          <div className="email-profile__email-container">
            <label className="email-profile__email-label">
              {isCredentialsValid ? "Old email:" : "Email:"}
            </label>
            <span className="email-profile__email-text">{email}</span>
          </div>
        )}

        {isCredentialsValid ? (
          <div className="email-profile__newemail-container">
            <label className="email-profile__newemail-label">New email:</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="email-profile__newemail-input"
            />
          </div>
        ) : (
          <div className="email-profile__pwd-container">
            <label className="email-profile__pwd-label">Password:</label>
            <input
              type="password"
              onKeyUp={handleInputPwdKeyUp}
              onChange={(e) => setVerifyPassword(e.target.value)}
              className="email-profile__pwd-input"
            />
            {isWrongPassword && (
              <div className="email-profile__pwd-error">
                Password incorrect! Please try again
              </div>
            )}
          </div>
        )}
        <button
          className={
            isUpdatingEmailProcess || isCheckSignInProcess
              ? "btn email-profile__submit-btn email-profile__submit-btn--disabled"
              : "btn email-profile__submit-btn"
          }
          onClick={
            isUpdatingEmailProcess || isCheckSignInProcess
              ? undefined
              : handleClick
          }
        >
          {isUpdatingEmailProcess || isCheckSignInProcess
            ? "Processing"
            : "Xác nhận"}
        </button>
        {isPopupShowing && (
          <PopupModal
            isAccountPage={isAccountPage}
            isUpdateEmailSuccess={isUpdateEmailSuccess}
            isPopupShowing={isPopupShowing}
            togglePopup={togglePopup}
          ></PopupModal>
        )}
      </div>
    </>
  );
};

export default EmailSmallContent;
