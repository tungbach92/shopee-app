import React from "react";

const EmailSmallContent = ({ setVerifyPassword }) => {
  const handleClick = () => {};
  return (
    <>
      <div className="email-profile__content">
        <div className="email-profile__email-container">
          <label className="email-profile__email-label">Email:</label>
          <span className="email-profile__email-text">ereasrfse@fgsdgf</span>
        </div>
        <div className="email-profile__pwd-container">
          <label className="email-profile__pwd-label">Password:</label>
          <input
            type="password"
            onChange={(e) => setVerifyPassword(e.target.value)}
            className="email-profile__pwd-input"
          />
        </div>
        <button
          className="btn email-profile__submit-btn"
          onClick={handleClick}
        >Xác nhận</button>
      </div>
    </>
  );
};

export default EmailSmallContent;
