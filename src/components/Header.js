import React from "react";

export default function Header({
  isCheckoutPage,
  isCartPageLoaded,
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
          : isCartPageLoaded || isCheckoutPage
          ? "header header--support"
          : "header"
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
