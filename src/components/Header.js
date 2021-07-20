import React from "react";

export default function Header({
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
          : isProductPage || isOrderPage
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
