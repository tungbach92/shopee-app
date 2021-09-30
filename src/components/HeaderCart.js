import React, { useContext, useEffect, useState } from "react";
import noCartImg from "../img/no-cart.png";
import { ProductContext } from "../context";
import classNames from "classnames";
import { Link } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import useModal from "../hooks/useModal";
import PopupModal from "./PopupModal";
const HeaderCart = ({ isProductPage, isSearchPage }) => {
  const {
    cartItems,
    handleClick,
    delCartItem,
    user,
    setCartItemsFromFirebase,
  } = useContext(ProductContext);
  const [deleteID, setDeleteID] = useState();
  const { isPopupShowing, togglePopup } = useModal();
  useEffect(() => {
    setCartItemsFromFirebase(user);
  }, [setCartItemsFromFirebase, user]);

  const handleCartDelete = (id) => {
    setDeleteID(id);
    togglePopup(!isPopupShowing);
  };
  const handleDeleteCartTrue = (id) => {
    delCartItem(id);
  };

  return (
    <div className="header__cart">
      <div className="header__cart-wrapper">
        <a href="# " className="header__cart-icon-link">
          <i className="header__cart-icon bi bi-cart">
            {/* <!-- No cart: empty --> */}
            <div className="header__cart-numb">{cartItems?.length}</div>
          </i>
        </a>
        {/* <!-- No cart: header__cart-list--empty --> */}
        <div
          className={classNames("header__cart-list", {
            "header__cart-list--empty": cartItems?.length === 0,
          })}
        >
          <div className="header__cart-arrow"></div>
          <div className="header__cart-list-container">
            <div className="header__cart-title">Sản phẩm mới thêm</div>
            <div className="header__cart-list-item">
              {cartItems?.map((item, index) => (
                <div key={index} className="header__cart-item">
                  <Link
                    to={{
                      pathname: `/product/${item.metaTitle}/${item.id}`,
                      state: { id: item.id },
                    }}
                    className="header__cart-link"
                  >
                    <img
                      className="header__cart-img"
                      src={require(`../img/${item.imageUrl}`).default}
                      alt="item-ao"
                    />
                    <div className="header__cart-name">{item.name}</div>
                    <div className="header__cart-price">
                      <CurrencyFormat
                        decimalScale={2}
                        value={item.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₫"}
                      ></CurrencyFormat>
                    </div>
                    <span>x</span>
                  </Link>
                  <div className="header__cart-amount">
                    <i
                      data-name="incrCartItem"
                      onClick={handleClick}
                      className="header__cart-incr bi bi-caret-up-fill"
                      data-id={item.id}
                    ></i>
                    <input
                      className="header__cart-amount-item"
                      data-id={item.id}
                      data-name="inputAmount"
                      value={item.amount <= 0 ? 1 : item.amount}
                      onChange={handleClick}
                    />

                    <i
                      data-name="decrCartItem"
                      onClick={handleClick}
                      className="header__cart-decr bi bi-caret-down-fill"
                      data-id={item.id}
                    ></i>
                  </div>
                  <span
                    onClick={() => handleCartDelete(item.id)}
                    className="header__cart-delBtn"
                  >
                    Xóa
                  </span>
                </div>
              ))}
            </div>
          </div>
          <img
            src={noCartImg}
            className="header__cart-empty-img"
            alt="no-cart"
          />
          <div className="header__cart-empty-info">Chưa có sản phẩm</div>
          <Link to="/cart" className="btn header__cart-button">
            Xem giỏ hàng
          </Link>
        </div>
      </div>
      {isPopupShowing && (
        <PopupModal
          isProductPage={isProductPage}
          isSearchPage={isSearchPage}
          isPopupShowing={isPopupShowing}
          togglePopup={togglePopup}
          deleteID={deleteID}
          setDeleteID={setDeleteID}
          handleDeleteCartTrue={handleDeleteCartTrue}
        ></PopupModal>
      )}
    </div>
  );
};

export default HeaderCart;
