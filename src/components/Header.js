import React from "react";

const Header = ({
  isEmailPage,
  isAccountPage,
  isSearchPage,
  isProductPage,
  isOrderPage,
  headerSearch,
  headerNav,
  isLoginPage,
  isRegisterPage,
  headerSimpleContent,
}) => {
  console.log("header render");
  return (
    <header
      className={
        isLoginPage || isRegisterPage
          ? "header header--login"
          : isProductPage ||
            isOrderPage ||
            isSearchPage ||
            isAccountPage ||
            isEmailPage
          ? "header"
          : "header header--support"
      }
    >
      <div className="grid grid--fullheight">
        {headerNav}
        {headerSearch}
        {headerSimpleContent}
      </div>
    </header>
  );
};
export default Header;
