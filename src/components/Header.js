import React from "react";

export default function Header({
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
}) {
  return (
    <header
      className={
        isLoginPage || isRegisterPage
          ? "header header--login"
          : isProductPage || isOrderPage || isSearchPage || isAccountPage || isEmailPage
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
}
