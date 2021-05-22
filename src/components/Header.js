import React from "react";
import HeaderNav from "./HeaderNav";

export default function Header(props) {
  return (
    <header className="header">
      <div className="grid grid--fullheight">
        <HeaderNav></HeaderNav>
        {props.children}
      </div>
    </header>
  );
}
