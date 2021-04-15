import React from "react";
import HeaderNav from "./HeaderNav";
import HeaderSearch from "./HeaderSearch";

export default function Header() {
  return (
    <header className="header">
      <div className="grid grid--fullheight">
          <HeaderNav></HeaderNav>
          <HeaderSearch></HeaderSearch>
      </div>
    </header>
  );
}
