import React from "react";
import HeaderNav from "./HeaderNav";
import HeaderSearch from "./HeaderSearch";

export default function Header() {
  return (
    <header class="header">
      <div class="grid grid--fullheight">
          <HeaderNav></HeaderNav>
          <HeaderSearch></HeaderSearch>
      </div>
    </header>
  );
}
