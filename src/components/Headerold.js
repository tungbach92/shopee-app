import React from "react";

const Header = ({
  headerSearch,
  headerNav,
  headerSimpleContent,
  headerClass,
}) => {
  console.log("header render");
  return (
    <header
      className={"header "+headerClass}
        
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
