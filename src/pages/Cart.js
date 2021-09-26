import React, { useContext, useState, useEffect } from "react";
import Header from "../components/Header";
import CartProduct from "../components/CartProduct";
import HeaderSearch from "../components/HeaderSearch";
import HeaderNav from "../components/HeaderNav";
import { ProductContext } from "../context";
import PopupModal from "../components/PopupModal";
import useModal from "../hooks/useModal";

export default function Cart() {
  const [isCartPageLoaded, setIsCartPageLoaded] = useState(false);
  // const { isPopupShowing, togglePopup } = useModal();
  useEffect(() => {
    // effect
    setIsCartPageLoaded(true);
    return () => {
      // cleanup
    };
  }, []);
  return (
    <>
      <Header
        headerNav={<HeaderNav></HeaderNav>}
        headerSearch={
          <HeaderSearch
            isCartPageLoaded={isCartPageLoaded}
          ></HeaderSearch>
        }
      ></Header>
      <CartProduct
        isCartPageLoaded={isCartPageLoaded}
        // popupModal={
        //   <PopupModal
        //     isCartPageLoaded={isCartPageLoaded}
        //     isPopupShowing={isPopupShowing}
        //     togglePopup={togglePopup}
        //   ></PopupModal>
        // }
      ></CartProduct>
    </>
  );
}
